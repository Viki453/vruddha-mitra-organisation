import Spinner from "../../ui/Spinner";
import TodayBookingCard from "./TodayBookingCard";
import useTodaysBookings from "./useTodaysBookings";

function TodayBookingContainer() {
  const { todayBookings, isLoading } = useTodaysBookings();

  if (isLoading) return <Spinner />;

  return (
    <div className="bg-base-300 p-5 rounded-md">
      <div className="text-xl font-semibold mb-4">Today's Bookings:</div>
      <div className="bg-base-200 w-full h-80 overflow-y-scroll rounded-lg p-2">
        {!todayBookings ? (
          <ul className="space-y-2">
            {todayBookings?.map((booking) => (
              <li key={booking.id}>
                <TodayBookingCard booking={booking} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex justify-center items-center content-center">
            No Appointments today
          </div>
        )}
      </div>
    </div>
  );
}

export default TodayBookingContainer;
