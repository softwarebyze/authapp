"use client";
import styles from "./layout.module.css";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "./auth-provider";

export default function Navbar() {
  const { userId } = useContext(AuthContext);
  return (
    <nav className={styles.nav}>
      <Link className={styles.navlink} href="/">
        Home
      </Link>
      {userId ? (
        <Link className={styles.navlink} href="/logout">
          Log out
        </Link>
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
