"use client";
import { FormEvent, useContext, useState } from "react";
import styles from "../../page.module.css";
import { AuthContext } from "../../../auth-provider";
import { Button, TextField, Typography } from "@mui/material";

export default function Login({ params }: { params: { email: string } }) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setUserId } = useContext(AuthContext);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    const data = {
      email: decodeURIComponent(params.email),
      password,
    };

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = "http://127.0.0.1:5000/login";

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
      setUserId(result?.user_id);
    } else if (result.message === "Incorrect password.") {
      setMessage(result.message);
    } else {
      setMessage("Something went wrong.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Typography variant="h1">Login</Typography>
      <Typography variant="body1">
        Email: {decodeURIComponent(params.email)}
      </Typography>
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
