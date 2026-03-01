import React, { useEffect, useState } from "react";
import MealCard from "../components/MealCard";
import breakfast from "../assets/breakfast.jpg";
import lunch from "../assets/lunch.jpg";
import snacks from "../assets/snacks.jpg";
import dinner from "../assets/dinner.jpg";
import mess from "../assets/mess.jpg";
import mess2 from "../assets/mess2.jpg";
import logo from "../assets/logo.jpg";
import "../index.css";

function Home() {

  const [clock, setClock] = useState("");
  const [greet, setGreet] = useState("");

  useEffect(() => {

    // Live Clock
    const timer = setInterval(() => {
      setClock(new Date().toLocaleTimeString());
    }, 1000);

    // Greeting
    const hour = new Date().getHours();
    if (hour < 12) setGreet("🌞 Good Morning, IIITL Students!");
    else if (hour < 18) setGreet("🌤 Good Afternoon!");
    else setGreet("🌙 Good Evening!");

    // Highlight Current Meal
    const highlightMeal = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      const meals = [
        { id: 0, start: 510, end: 630 },
        { id: 1, start: 750, end: 870 },
        { id: 2, start: 1020, end: 1080 },
        { id: 3, start: 1170, end: 1290 }
      ];

      const cards = document.querySelectorAll(".card");
      cards.forEach(c => c.classList.remove("highlight"));

      meals.forEach(meal => {
        if (currentMinutes >= meal.start && currentMinutes <= meal.end) {
          cards[meal.id].classList.add("highlight");
        }
      });
    };

    highlightMeal();
    const mealTimer = setInterval(highlightMeal, 60000);

    return () => {
      clearInterval(timer);
      clearInterval(mealTimer);
    };

  }, []);

  return (
    <>
      {/* GREETING */}
      <h2 className="text-center mt-4">{greet}</h2>

      {/* CAROUSEL */}
      <div className="container mt-4">
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={mess} className="d-block w-100" alt="mess" />
            </div>
            <div className="carousel-item">
              <img src={mess2} className="d-block w-100" alt="mess2" />
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>

          <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>

      {/* TODAY'S SPECIAL */}
      <div className="container my-5 text-center">
        <h2>Today's Special</h2>

        <div className="row mt-4">
          <MealCard image={breakfast} title="Breakfast" time="8:30 AM – 10:30 AM" />
          <MealCard image={lunch} title="Lunch" time="12:30 PM – 2:30 PM" />
          <MealCard image={snacks} title="Snacks" time="5:00 PM – 6:00 PM" />
          <MealCard image={dinner} title="Dinner" time="7:30 PM – 9:30 PM" />
        </div>
      </div>

      {/* SCROLL TOP BUTTON */}
      <button id="topBtn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button>
    </>
  );
}

export default Home;