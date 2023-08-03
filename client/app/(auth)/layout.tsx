import styles from "./layout.module.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.page}>
      <section className={styles.main}>{children}</section>
      <div className={styles.image}>Image</div>
    </div>
  );
}
