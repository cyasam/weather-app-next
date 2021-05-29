import Link from 'next/link';
import styles from '../styles/Page404.module.css';

export default function Page404() {
  return (
    <div className={styles.page404}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>404</h1>
        <h2 className={styles.subheading}>Not Found</h2>
        <Link href="/">
          <a className={styles.button}>Return to Home</a>
        </Link>
      </div>
    </div>
  );
}
