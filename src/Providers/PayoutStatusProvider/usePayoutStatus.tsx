import { useEffect, useState } from "react";
import { toast } from "sonner";

const usePayoutStatus = () => {
  const [showPayouts, setShowPayouts] = useState<boolean>(() => {
    const stored = localStorage.getItem("showPayouts");
    const storedDate = localStorage.getItem("payoutsDate");

    const today = new Date();
    const currentDay = today.getDay(); // 2 = Tuesday

    if (stored === "true" && storedDate === today.toDateString() && currentDay === 3) {
      return true;
    }

    return false;
  });

  const generatePayouts = () => {
    const today = new Date();
    const currentDay = today.getDay();

    if (currentDay === 3) {
      setShowPayouts(true);
      localStorage.setItem("showPayouts", "true");
      localStorage.setItem("payoutsDate", today.toDateString());
    } else {
      toast.error("Payouts can only be generated on Tuesdays!");
    }
  };

  // Auto-reset showPayouts at midnight on Wednesday
  useEffect(() => {
    const now = new Date();
    const currentDay = now.getDay();

    if (currentDay !==3) {
      localStorage.removeItem("showPayouts");
      localStorage.removeItem("payoutsDate");
      setShowPayouts(false);
    }

    const msUntilMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0,
      0
    ).getTime() - now.getTime();

    const timeout = setTimeout(() => {
      const nextDay = new Date();
      if (nextDay.getDay() !== 3) {
        localStorage.removeItem("showPayouts");
        localStorage.removeItem("payoutsDate");
        setShowPayouts(false);
      }
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, []);

  return { showPayouts, generatePayouts };
};

export default usePayoutStatus;
