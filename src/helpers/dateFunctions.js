import { getDay, format } from "date-fns";

export function formatDateBookings(date) {
  const dayNumber = getDay(new Date(date));
  let day;

  switch (dayNumber) {
    case 0:
      day = "Sun";
      break;
    case 1:
      day = "Mon";
      break;
    case 2:
      day = "Tue";
      break;
    case 3:
      day = "Wed";
      break;
    case 4:
      day = "Thu";
      break;
    case 5:
      day = "Fri";
      break;
    case 6:
      day = "Sat";
      break;
    default:
      day = "Unknown";
  }

  const formattedDate = format(new Date(date), "dd MMM yyyy");

  return { day, formattedDate };
}
