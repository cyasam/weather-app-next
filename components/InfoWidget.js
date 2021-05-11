import Image from 'next/image';
import styles from '../styles/InfoWidget.module.css';

const InfoWidget = ({ icon, text, size }) => {
  return (
    <div className={styles.info}>
      <Image src={`https:${icon}`} width={size} height={size} />
      <span>{text}</span>
    </div>
  );
};

InfoWidget.defaultProps = {
  size: 64,
};

export default InfoWidget;
