import React, { useState, useEffect } from "react";
import loader from "../assects/cm.png"; // Import loader image
import "../index.css";
import "./app.css";
import NavBar from "./navbar/navBar";
import Home from "./home/home";
import SplitLayout from "./cv/splitLayout";
import SlidingCards from "./ourCompany/ourCompany";
import Testimonials from "./testimonials/testimonials";
import Footer from "./footer/footer";

const App = () => {
  const [loading, setLoading] = useState(true);
  const images = [
    "https://res.cloudinary.com/dyj4csr44/image/upload/v1739382442/carousel/wcsmax8gcfux2mzsbry7.jpg",
    "https://res.cloudinary.com/dyj4csr44/image/upload/v1739382441/carousel/ni1lmveheixhr9owyrgb.jpg",
    "https://res.cloudinary.com/dyj4csr44/image/upload/v1739382440/carousel/jz8pzatt2fbozzgfc1t9.jpg",
    "https://res.cloudinary.com/dyj4csr44/image/upload/v1739382439/carousel/i1vgbm4w7qcsn9nla8vr.jpg",
    "https://res.cloudinary.com/dyj4csr44/image/upload/v1739382439/carousel/bwmgwxt6obfydqe3yndi.jpg",
  ];

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <img src={loader} alt="Loading..." className="loader rounded" />
      </div>
    )
  }

  return (
    <>
      <NavBar />
      <section style={{ paddingRight: "2%", paddingLeft: "2%" }}>
        <Home images={images} />
        <SplitLayout />
        <SlidingCards />
        <Testimonials />
      </section>
      <Footer />
    </>
  );
};

export default App;
