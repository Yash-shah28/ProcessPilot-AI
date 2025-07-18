// utils/getNextDateTime.js
export function getNextDateTime(recurrence = "", time = "15:00", date = null) {
  const [hours, minutes] = time.split(":").map(Number);
  const now = new Date();

  // For one-time event (specific date is provided)
  if (recurrence.toLowerCase().startsWith("once") && date) {
    const eventDate = new Date(date);
    eventDate.setHours(hours, minutes, 0, 0);
    return eventDate;
  }

  // Recurring: find next matching weekday
  const days = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 0,
  };

  const dayStr = recurrence.split(" ")[1]; // "Monday", etc.
  const targetDay = days[dayStr];

  const target = new Date();
  target.setHours(hours, minutes, 0, 0);

  while (target.getDay() !== targetDay || target <= now) {
    target.setDate(target.getDate() + 1);
  }

  return target;
}
