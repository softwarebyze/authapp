import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import styles from "./layout.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth App",
  description: "Full Stack User Authentication Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className={styles.nav}>
          <Link className={styles.navlink} href="/">
            Home
          </Link>
          <div className={styles.navlinks}>
            <Link className={styles.navlink} href="login">
              Log in
            </Link>
            <Link className={styles.navlink} href="signup">
              Sign up
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
