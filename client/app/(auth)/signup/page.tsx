"use client";
import { FormEvent, useState } from "react";
import styles from "../page.module.css";
import Link from "@mui/material/Link";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import { Box, Button, Typography } from "@mui/material";

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
    // if email doesn't exist, redirect to signup page
    if (result.message == "Email is available for registration.") {
      router.push(`/signup/${email}`);
      return;
    }
    // if email exists, setError to "Email already exists."
    else if (result.message === "Email already exists.") {
      setError("Email already exists.");
      return;
    }
    // else setError to "Something went wrong."
    else {
      setError("Something went wrong.");
      console.error(result);
      return;
    }
  };

  return (
    <>
      <Typography variant="h2" sx={{ my: 4, mx: "auto" }}>
        Welcome to Consultant.AI
      </Typography>
      <Box sx={{ width: 1 / 4 }}>
        <form className={styles.form} onSubmit={handleSubmit}>
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
          {error === "Email already exists." && (
            <Link href="/login">Click here to log in</Link>
          )}
        </form>
      </Box>
    </>
  );
}
