import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import "./App.css";

//import des pages
import Stripe from "./components/stripe";
import HomePage from "./pages/HomePage/HomePage";
import OfferPage from "./pages/OfferPage/OfferPage";
import Header from "./components/Header/Header";
import SignUp from "./pages/SignupPage/SignUp";
import Cookies from "js-cookie";
import Login from "./pages/LoginPage/Login";
import Publish from "./pages/PublishPage/Publish";

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || "");

  return (
    <Router>
      <Header token={token} setToken={setToken} />
      <Link to="/"></Link>
      <Link to="/Offer"></Link>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Offer/:id" element={<OfferPage />} />
        <Route path="/signup" element={<SignUp setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/payment" element={<Stripe token={token} />} />
        <Route path="/publish" element={<Publish token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
