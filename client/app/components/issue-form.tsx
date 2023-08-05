"use client";

import { Button, Chip, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface IssueForm {
  title: string;
  body: string;
  labels: string[];
}
export default function IssueForm() {
  const [form, setForm] = useState<IssueForm>({
    title: "",
    body: "",
    labels: [],
  });
  const [label, setLabel] = useState("");
  const addLabel = () => {
    setForm({ ...form, labels: [...form.labels, label] });
    setLabel("");
  };
  return (
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
      <Button variant="contained" color="primary">
        Create Issue
      </Button>
    </Container>
  );
}
