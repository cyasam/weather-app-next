import ScrollContainer from 'react-indiana-drag-scroll';
import { motion } from 'framer-motion';

import styles from '../styles/Grid.module.css';

const transition = {
  duration: 0.7,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const Grid = ({ data, children }) => {
  if (!data) {
    return null;
  }

  return (
    <motion.div
      className={styles.wrapper}
      initial={{
        opacity: 0,
        y: -20,
        transition,
      }}
      animate={{
        opacity: 1,
        y: 0,
        transition,
      }}
      exit={{
        opacity: 0,
        y: -20,
        transition,
      }}
    >
      <ScrollContainer className="scroll-container" hideScrollbars={false}>
        <div className={styles.grid}>
          {data.map((day) => {
            return children(day);
          })}
        </div>
      </ScrollContainer>
    </motion.div>
  );
};

export default Grid;
