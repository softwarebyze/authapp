"use client";
import { FormEvent, useState } from "react";
import styles from "../../page.module.css";
import { Button, TextField, Typography } from "@mui/material";

export default function CreateAccount({
  params,
}: {
  params: { email: string };
}) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    const data = {
      email: decodeURIComponent(params.email),
      name,
      password,
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
      setMessage(result.message);
    } else {
      setMessage("Something went wrong.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Typography variant="h2">Create your account</Typography>
      <Typography variant="body1">
        Email: {decodeURIComponent(params.email)}
      </Typography>
      <TextField
        type="text"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Full name"
        variant="outlined"
        color="primary"
      />
      <TextField
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="password"
        variant="outlined"
        color="primary"
      />
      <Button variant="text">Sign up</Button>
      {message && <Typography variant="body1">{message}</Typography>}
    </form>
  );
}
