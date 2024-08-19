const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ReturnDocument, ObjectId } = require('mongodb');
require('dotenv').config();

// payment method
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

// const crypto = require('crypto');
// crypto.randomBytes(64, (err, buff) =>{
//   console.log(buff.toString('hex'));
// })

// middleware
app.use(cors());
app.use(express.json());

const UserName = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${UserName}:${password}@cluster0.706lpcp.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const jwtVerified = (req, res, next) => {

  const authHeader = req.headers.authorization;
  console.log('token iner jwt', authHeader);

  if (!authHeader) {
    return res.status(403).send('unauthorized access');
  }

  const token = authHeader.split(' ')[1];

  // console.log('token = ', token);

  // console.log(token);
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: 'forbidden access' });
    }

    req.decoded = decoded;
    // console.log('decoded = ', decoded);
    next();
  })

}

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    const appointmentOptionsCollection = client.db('doctorsPortal').collection('appointmentOptions');
    const bookingCollections = client.db('doctorsPortal').collection('bookingCollections');
    const userCollections = client.db('doctorsPortal').collection('userCollections');
    const doctorsCollections = client.db('doctorsPortal').collection('doctorsCollections');
    const paymentsCollections = client.db('doctorsPortal').collection('paymentsCollections');


    const verifyAdmin = async(req, res, next) => {
      console.log('decoded verifyAdmin = ', req.decoded.email);

      const decodedEmail = req.decoded.email;
      const query = { email: decodedEmail };
      const user = await userCollections.findOne(query);
      if (user?.role != 'admin') {
        return res.status(403).send({ message: 'Forbidden access' })
      }

      next();
    }


    app.get('/appoinmentOptions', async (req, res) => {
      const date = req.query.date;
      // console.log(date);
      const query = {};
      const options = await appointmentOptionsCollection.find(query).toArray();

      const bookingQuery = { AppoinmentDate: date };
      const alreadyBooked = await bookingCollections.find(bookingQuery).toArray();

      // console.log("alreadyBooked = ", alreadyBooked);

      options.forEach(option => {
        const optionBooked = alreadyBooked.filter(booked => booked.treatment === option.name);
        const bookedSlots = optionBooked.map(book => book.slot);
        const remainingSlots = option.slots.filter(slot => !bookedSlots.includes(slot));
        option.slots = remainingSlots;
      })

      res.send(options);
    })

    app.get('/appoinmentSpecility', async (req, res) => {
      const query = {};
      const options = await appointmentOptionsCollection.find(query).project({ name: 1 }).toArray();
      res.send(options);
    })

    app.get('/bookings', jwtVerified,async (req, res) => {

      const email = req.query.email;
      const date = req.query.AppoinmentDate;

      const decodedEmail = req.decoded.email;
      if (email !== decodedEmail) {
        return res.status(403).send({ message: 'forbidden access' });
      }

      const query = { email: email };
      // console.log('email, data = ', email, date);
      // console.log('to headers = ' , req.headers.authorization);
      // console.log(query);
      const allBooking = await bookingCollections.find(query).toArray();
      const bookings = allBooking.filter(booking => booking.AppoinmentDate === date);

      console.log('booking........', bookings);
      res.send(bookings);
    })

    app.get('/bookings/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const booking = await bookingCollections.findOne(query);
      console.log(booking);
      res.send(booking)
    })

    app.post('/bookings', async (req, res) => {
      const booking = req.body;
      // console.log(booking);

      const query = {
        AppoinmentDate: booking.AppoinmentDate,
        email: booking.email,
        treatment: booking.treatment
      }

      const alreadyBooked = await bookingCollections.find(query).toArray();

      if (alreadyBooked.length) {
        const message = `Your already have a booking on ${booking.AppoinmentDate}`
        return res.send({ acknowledged: false, message })
      }

      const result = await bookingCollections.insertOne(booking);
      res.send(result);
      // console.log(result);
    })

    app.get('/jwt', async (req, res) => {

      const email = req.query.email;
      const query = { email: email };
      const user = await userCollections.findOne(query);

      if (user) {
        const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
        return res.send({ accesstoken: token })
      }
      console.log(user);
      res.status(403).send({ accesstoken: '' });

    })

    app.get('/users', jwtVerified, async (req, res) => {

      const email = req.query.email;
      const decodedEmail = req.decoded.email;
      if (email !== decodedEmail) {
        return res.status(403).send({ message: 'forbidden access' });
      }
      // console.log('decoded email ', decodedEmail);

      const adminQuery = { email: email };
      const user = await userCollections.findOne(adminQuery);

      if (user?.role != 'admin') {
        return res.send([]);
      }


      const query = {};
      const users = await userCollections.find(query).toArray();
      res.send(users);
    })

    app.get('/users/admin/:email', async (req, res) => {

      const email = req.params.email;
      const query = { email: email };

      const user = await userCollections.findOne(query);
      res.send({ isAdmin: user?.role === 'admin' })

    })

    app.post('/users', async (req, res) => {
      const user = req.body;
      const result = await userCollections.insertOne(user);
      res.send(result);
    })

    app.put('/users/admin/:id', jwtVerified, verifyAdmin, async (req, res) => {

      const id = req.params.id; 
      const filter = { _id: new ObjectId(id) }
      const option = { upsert: true };
      const updateUser = {
        $set: {
          role: 'admin'
        }
      }
      const result = await userCollections.updateOne(filter, updateUser, option);
      res.send(result);
    })


    // payment 

    app.post('/create-payment-intent', async(req, res) =>{

      const booking = req.body;
      const price = booking.price;
      const amount = price * 100;

      // console.log('payment booking ', booking);

        // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({

        amount: amount,
        currency: "usd",
        "payment_method_types": [
          "card"
        ]
      })

      // console.log('payment intent ', paymentIntent.client_secret);

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    })


    app.post('/payments', async(req, res) =>{

      const payment = req.body;
      const result = await paymentsCollections.insertOne(payment);

      const id = payment.bookingId;
      const filter = {_id: new ObjectId(id)};

      const updatedDoc = {

        $set: {

          paid: true,
          transactionId: payment.transactionId
        }
      }

      const updatedResult = await bookingCollections.updateOne(filter, updatedDoc);

      res.send(result);

    })


    //***** temporary add any data in database  *******/
    // app.get('/addprice', async(req, res) =>{

    //   const filter = {};
    //   const option = {upsert: true};
    //   const updateUser = {
    //     $set: {
    //       price: 99
    //     }
    //   }
    //   const result = await appointmentOptionsCollection.updateMany(filter, updateUser, option);
    //   res.send(result);
    // })


    // doctors data post

    app.get('/doctors', jwtVerified, verifyAdmin, async (req, res) => {
      const query = {};
      const doctors = await doctorsCollections.find(query).toArray();
      res.send(doctors);
    })

    app.post('/doctors', jwtVerified, verifyAdmin, async (req, res) => {

      const doctor = req.body;
      const result = await doctorsCollections.insertOne(doctor);
      res.send(result);
    })



    app.delete('/doctors/:id', jwtVerified, verifyAdmin, async (req, res) => {

      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await doctorsCollections.deleteOne(query);
      res.send(result);
    })

    console.log("You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {

  res.send('doctors portal server is running');
})


app.listen(port, () => {

  console.log(`listening port is ${port}`);
})

//user name: doctors_portal 
//password kqzwVxQkFGkhrW8u
// xIOWVcn1UKcKmG6N