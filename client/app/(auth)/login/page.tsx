import Link from "next/link";
import styles from "../page.module.css";

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <Link href="/signup">
        Don&apos;t have an account? Click here to sign up
      </Link>
    </div>
  );
}
