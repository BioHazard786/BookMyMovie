// function for generating fake date data using todays date

const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const virtualDateGenerator = () => {
  let virtualDates = [];
  let date = new Date();
  for (let i = 0; i < 5; i++) {
    virtualDates.push({
      day: weekday[date.getDay()],
      date: date.getDate(),
      month: month[date.getMonth()],
    });
    date = new Date(date.setDate(date.getDate() + 1));
  }

  return virtualDates;
};
