import ScrollContainer from 'react-indiana-drag-scroll';

import styles from '../styles/Grid.module.css';

const Grid = ({ data, children }) => {
  if (!data) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <ScrollContainer className="scroll-container" hideScrollbars={false}>
        <div className={styles.grid}>
          {data.map((day) => {
            return children(day);
          })}
        </div>
      </ScrollContainer>
    </div>
  );
};

export default Grid;
