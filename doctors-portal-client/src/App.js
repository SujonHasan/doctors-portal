import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import Router from './Component/Routers/Router/Router';
import 'react-day-picker/dist/style.css';
import { Toaster } from 'react-hot-toast'
import DarkMode from './tools/DarkMode/DarkMode';

function App() {

  return (
    <div className="App max-w-[1440px] mx-auto">
      <RouterProvider router={Router} ></RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
