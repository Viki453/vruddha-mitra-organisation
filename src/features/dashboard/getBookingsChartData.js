import { format } from "date-fns";

export function getBookingsChartData(bookings = []) {
  const countByDate = {};

  bookings.forEach((booking) => {
    const date = format(new Date(booking.date), "yyyy-MM-dd");
    countByDate[date] = (countByDate[date] || 0) + 1;
  });

  return Object.entries(countByDate)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}
