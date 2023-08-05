"use client";
import styles from "../layout.module.css";
import Link from "@mui/material/Link";
import { useContext } from "react";
import { AuthContext } from "../auth-provider";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export default function Navbar() {
  const { userId, setUserId } = useContext(AuthContext);
  const router = useRouter();
  const logOut = async () => {
    setUserId(null);
    const endpoint = "http://127.0.0.1:5000/logout";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: userId,
    };

    const response = await fetch(endpoint, options);
    // const response = await fetch(endpoint);
    const result = await response.json();
    console.log(result);
    router.push("/");
  };
  return (
    <nav className={styles.nav}>
      <Link className={styles.navlink} href="/">
        Home
      </Link>
      {userId ? (
        <Button variant="text" className={styles.navlink} onClick={logOut}>
          Log out
        </Button>
      ) : (
        <div className={styles.navlinks}>
          <Link className={styles.navlink} href="/login">
            Log in
          </Link>
          <Link className={styles.navlink} href="/signup">
            Sign up
          </Link>
        </div>
      )}
    </nav>
  );
}
