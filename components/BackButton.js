import Link from 'next/link';
import { motion } from 'framer-motion';
import { BiArrowBack } from 'react-icons/bi';

const transition = {
  duration: 0.7,
  ease: [0.43, 0.13, 0.23, 0.96],
};

export default function BackButton() {
  return (
    <motion.div
      style={{
        alignSelf: 'start',
        marginBottom: '2rem',
      }}
      initial={{
        opacity: 0,
        transition,
        translateX: 20,
      }}
      animate={{
        opacity: 1,
        translateX: 0,
        transition,
      }}
      exit={{ opacity: 0, translateX: '-400%', transition }}
    >
      <Link href="/">
        <a>
          <BiArrowBack color="#fff" size="2.5em" />
        </a>
      </Link>
    </motion.div>
  );
}
