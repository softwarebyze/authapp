"use client";
import { FormEvent, useState } from "react";
import styles from "../../page.module.css";

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
      <h1>Create your account</h1>
      <p>Email: {decodeURIComponent(params.email)}</p>
      <input
        type="text"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full name"
      />
      <input
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button>Sign up</button>
      {message && <p>{message}</p>}
    </form>
  );
}
