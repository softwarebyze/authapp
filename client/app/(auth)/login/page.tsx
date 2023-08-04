"use client";
import { FormEvent, useState } from "react";
import styles from "../page.module.css";
import Link from "@mui/material/Link";
import { useRouter } from "next/navigation";
import { Button, TextField, Typography } from "@mui/material";

export default function Login() {
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
    const endpoint = "http://127.0.0.1:5000/check-email";

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

    if (result.status !== "success") {
      setError("Something went wrong.");
      console.error(result);
    } else if (result.message === "Email already exists.") {
      router.push(`/login/${email}`);
    } else if (result.message === "Email is available for registration.") {
      setError("Email does not exist.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Typography variant="h2">Login</Typography>
      <TextField
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Enter your email"
        variant="outlined"
        color="primary"
      />
      <Button variant="text">Continue</Button>
      {error && (
        <Typography variant="body1" className={styles.error}>
          {error}
        </Typography>
      )}
      <Link href="/signup">
        Don&apos;t have an account? Click here to sign up
      </Link>
    </form>
  );
}
