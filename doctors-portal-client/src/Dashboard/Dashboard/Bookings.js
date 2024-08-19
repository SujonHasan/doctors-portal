import React from 'react';
import { Link } from 'react-router-dom';

const Bookings = ({book, index}) => {

    const {_id, patient, treatment, slot, price, paid} = book;

    // console.log(patient, treatment, slot);
    // console.log(index);

    return (
        <tr >
            <th>{index + 1}</th>
            <td>{patient}</td>
            <td>{treatment}</td>
            <td>{slot}</td>
            <td>
                {
                    price && !paid && <Link to={`/dashboard/payment/${_id}`} > <button className='btn btn-primary btn-sm' >Pay</button> </Link>
                }

                {
                     price && paid && <p className='text-green-600' >Paid</p>
                }
            </td>
        </tr>
    );
};

export default Bookings;