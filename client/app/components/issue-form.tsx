"use client";

import { Button, Chip, Container, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";

interface IssueForm {
  title: string;
  body: string;
  labels: string[];
}
export default function IssueForm() {
  const emptyForm = {
    title: "",
    body: "",
    labels: [],
  };
  const [form, setForm] = useState<IssueForm>(emptyForm);
  const [label, setLabel] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const addLabel = () => {
    setForm({ ...form, labels: [...form.labels, label] });
    setLabel("");
  };
  const handleCreateIssue = async (event: FormEvent<HTMLFormElement>) => {
    setError("");
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    const data = form;

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = "http://127.0.0.1:5000/create-issue";

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
    } else {
      setMessage(result.message);
      setForm(emptyForm);
    }
  };
  // This avoids submitting the whole form when pressing Enter to add a label
  const handleLabelInputKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addLabel();
    }
  };
  return (
    <form onSubmit={handleCreateIssue}>
      <Container sx={{ display: "flex", flexDirection: "column", mt: 4 }}>
        <Typography variant="h6">Create an issue</Typography>
        <TextField
          sx={{ my: 1 }}
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          label="Issue Title"
          variant="outlined"
          color="primary"
        />
        <TextField
          sx={{ my: 1 }}
          type="text"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          label="Issue Body"
          variant="outlined"
          color="primary"
        />
        <Container sx={{ display: "flex", flexDirection: "column", my: 1 }}>
          <Container sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onKeyPress={handleLabelInputKeyPress} // Added this line to avoid submitting form on Enter key press
              label="Issue Label"
              variant="outlined"
              color="primary"
            />
            <Button
              sx={{ mx: 1 }}
              onClick={addLabel}
              variant="contained"
              color="primary"
            >
              Add Label
            </Button>
          </Container>
          <Container sx={{ display: "flex", mt: 1 }}>
            {form.labels.map((label, id) => (
              <Chip sx={{ mx: 1 }} key={id} label={label} />
            ))}
          </Container>
        </Container>
        {error && (
          <Typography color="red" variant="body1">
            {error}
          </Typography>
        )}
        {message && (
          <Typography color="green" variant="body1">
            {message}
          </Typography>
        )}
        {message === "GitHub issue created successfully." && (
          <Typography variant="body1">
            <a
              href="
          https://github.com/softwarebyze/authapp/issues"
              target="_blank"
            >
              View issues on GitHub
            </a>
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary">
          Create Issue
        </Button>
      </Container>
    </form>
  );
}
