import React, { useEffect } from "react";

const Clock = () => {
  const [date, setDate] = React.useState(new Date());

  useEffect(() => {
    let newDate: Date;
    const timer = setInterval(() => {
      newDate = new Date();
      if (newDate.getMinutes() !== date.getMinutes()) {
        setDate(new Date());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  const formattedMinutes = date.getMinutes().toString().padStart(2, "0");

  return (
    <span>
      {date.getHours()} : {formattedMinutes}
    </span>
  );
};

export default Clock;
