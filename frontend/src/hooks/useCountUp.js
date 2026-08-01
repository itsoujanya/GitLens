import { useState, useEffect } from 'react';

export default function useCountUp(end, duration = 1000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (end === 0) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [end, duration]);
  return count;
}