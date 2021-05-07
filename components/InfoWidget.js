import Image from 'next/image';
import styles from '../styles/InfoWidget.module.css';

const InfoWidget = ({ icon, text }) => {
  return (
    <div className={styles.info}>
      <Image src={`https:${icon}`} width={64} height={64} />
      <span>{text}</span>
    </div>
  );
};

export default InfoWidget;
