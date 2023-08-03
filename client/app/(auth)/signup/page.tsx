"use client";
import { FormEvent, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  // Handles the submit event on form submit.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    const data = {
      email,
    };

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = "http://127.0.0.1:5000/register";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    console.log(result);
    if (result.status == "success") {
      console.log("Success");
    } else {
      if (result.message === "Email already exists.") {
        setError("Email already exists.");
      }
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p>Welcome to Consultant.AI</p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button>Continue</button>
      {error && <p className={styles.error}>{error}</p>}
      {error === "Email already exists." && <Link href="/login">Click here to log in</Link>}
    </form>
  );
}
