"use client";

import { useEffect, useState } from "react";

export default function BanglaDate() {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", {
        timeZone: "Asia/Dhaka",
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    );
  }, []);

  return <span>{date}</span>;
}