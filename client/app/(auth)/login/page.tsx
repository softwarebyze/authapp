import Link from "next/link";

export default function Login() {
  return (
    <div>
      <p>Login</p>
      <Link href="/signup">
        Don&apos;t have an account? Click here to sign up
      </Link>
    </div>
  );
}
