import "./App.css";
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route, //npm install react-router-dom
} from "react-router-dom";

import { AddOrder } from "./components/form/PlaceOrder";
import { Signin } from "./components/form/Login";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin/>} />
          <Route path="/home" element={<AddOrder/>} />
        
        </Routes>
      </BrowserRouter>
    </>
  );
}





export default App;
