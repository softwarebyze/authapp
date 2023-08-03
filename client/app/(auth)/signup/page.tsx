"use client";
import { FormEvent, useState } from "react";
import styles from "../page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

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

    if (result.status == "success") {
      router.push(`/signup/${email}`);
    } else {
      if (result.message === "Email already exists.") {
        setError("Email already exists.");
      } else {
        setError("Something went wrong.");
        console.error(result);
      }
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Welcome to Consultant.AI</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button>Continue</button>
      {error && <p className={styles.error}>{error}</p>}
      {error === "Email already exists." && (
        <Link href="/login">Click here to log in</Link>
      )}
    </form>
  );
}
