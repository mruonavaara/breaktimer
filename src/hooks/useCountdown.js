import { useState, useEffect } from 'react';

function useCountdown(targetTime) {
  const countdownTime = new Date(targetTime).getTime();
  const [countdown, setCountdown] = useState(countdownTime - Date.now());

  useEffect(() => {
    const timer = setInterval(() => setCountdown(countdownTime - Date.now()), 1000);
    return () => clearInterval(timer);
  });

  function getReturnValues(countDown) {
    // calculate time left
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  if (!targetTime) {
    return {};
  } else {
    return getReturnValues(countdown);
  }
}

export { useCountdown };