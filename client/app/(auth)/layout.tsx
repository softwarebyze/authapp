import styles from "./layout.module.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.page}>
      <section className={styles.main}>{children}</section>
      <div className={styles.image}>
        <img
          className={styles.img}
          alt=""
          src="https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&w=800"
        />
      </div>
    </div>
  );
}
