"use client";
import React, {useState, useEffect} from "react";

const countdown_target = new Date("2025-06-19T17:00:00");

const getTimeLeft = () => {
    const totalTimeLeft = countdown_target - new Date();
    const days = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(totalTimeLeft / (1000 * 60 * 60) % 24);
    const minutes = Math.floor(totalTimeLeft / (1000 * 60) % 60);
    const seconds = Math.floor(totalTimeLeft / 1000 % 60);
    return {days, hours, minutes, seconds};
}

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState(() => getTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 1000);

        return () => clearInterval(timer);

    }, []);


  return (
    <div>
      <h2>Countdown</h2>
      <div className="content">
        {Object.entries(timeLeft).map( el => {
            return(
                <div className="box" key={el[0]}>
                    <div className="value">{el[1]}</div>
                    <div className="label">{el[0]}</div>
                </div>
            )
        })}

        
      </div>
    </div>
  );
}