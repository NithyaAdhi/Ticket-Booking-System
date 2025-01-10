import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingView from "./pages/LandingView";
import AdminDashboard from "./pages/adminDashboard";
import Login from "./pages/login"; // Update the import statement to use lowercase "login"



export default function AppRoutes(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingView />} />
        {/* <Route path="/view-flight-info" element={<FlightInfo />} />
        <Route path="/book-flight/:flid" element={<BookingInfo />} /> */}
        <Route path="/admin dashboard" element={<AdminDashboard />} />
        <Route path="/admin login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
