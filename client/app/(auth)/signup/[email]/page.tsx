"use client";
import { useState } from "react";
import styles from "../../page.module.css";

export default function CreateAccount({
  params,
}: {
  params: { email: string };
}) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form className={styles.form}>
      <p>Email: {decodeURIComponent(params.email)}</p>
      <h1>Create your account</h1>
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
    </form>
  );
}
