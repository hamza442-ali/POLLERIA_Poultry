import "./App.css";
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route, //npm install react-router-dom
} from "react-router-dom";

// import {LandingPage} from './pages/landingPage/LandingPage'

import { AddOrder } from "./components/form/PlaceOrder";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<AddOrder />} />
        
        </Routes>
      </BrowserRouter>
    </>
  );
}





export default App;
