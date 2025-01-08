import { useEffect, useState } from "react";

const useCountdown = (initialCooldown: number) => {
  //                      ^ When user render the code page first time, user cannot resend code for X seconds.
  const [secondsLeft, setSecondsLeft] = useState<number>(initialCooldown);
  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timeout = setTimeout(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);
  }, [secondsLeft]);

  function start(seconds: number) {
    setSecondsLeft(seconds);
  }

  return { secondsLeft, start };
};