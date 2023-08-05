import IssueForm from "./components/issue-form";
import styles from "./page.module.css";
import { Container, Grid, Typography } from "@mui/material";

export default function Home() {
  return (
    <main className={styles.main}>
      <Grid textAlign="center">
        <Typography variant="h1">Auth App</Typography>
        <Container>
          <IssueForm />
        </Container>
      </Grid>
    </main>
  );
}
