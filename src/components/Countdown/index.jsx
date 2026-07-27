import React, { useState, useEffect } from "react";
import "./index.css";

const Countdown = () => {
  
  const targetDate = new Date("2026-06-21T00:00:00");

  const calculateTimeLeft = () => {
    const difference = targetDate - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="countdown">
      <h2>COUNTDOWN TO GLOBAL FEST CANADA 2026</h2>
      <div className="countdown-timer">
        <div><span>{timeLeft.days || 0}</span><p>Days</p></div>
        <div><span>{timeLeft.hours || 0}</span><p>Hours</p></div>
        <div><span>{timeLeft.minutes || 0}</span><p>Minutes</p></div>
        <div><span>{timeLeft.seconds || 0}</span><p>Seconds</p></div>
      </div>
    </section>
  );
};

export default Countdown;
