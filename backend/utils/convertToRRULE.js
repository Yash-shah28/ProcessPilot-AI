// utils/convertToRRULE.js
export function convertToRRULE(recurrence = "") {
  const days = {
    Monday: "MO",
    Tuesday: "TU",
    Wednesday: "WE",
    Thursday: "TH",
    Friday: "FR",
    Saturday: "SA",
    Sunday: "SU",
  };

  const words = recurrence.trim().split(" ");
  const frequency = words[0]?.toLowerCase(); // "every" or "once"
  const day = words[2] || words[1]; // "Monday", "Tuesday", etc.

  const dayCode = days[day];

  if (!dayCode) return null;

  if (frequency === "every") {
    return `RRULE:FREQ=WEEKLY;BYDAY=${dayCode}`;
  }

  return null; // For one-time event
}
