import { useNavigate } from "react-router";
import BookingBadge from "../../ui/BookingBadge";

function TodayBookingCard({ booking }) {
  const navigate = useNavigate();

  function handleRedirect() {
    navigate(`/booking/${booking.id}`, { replace: true });
  }

  const status = booking.status;

  return (
    <div className="border border-base-300 bg-base-100 rounded-xl p-4 shadow-md hover:shadow-lg transition duration-200 text-sm">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <p className="">
            <span className="font-semibold ">Booking ID:</span> {booking.id}
          </p>
          <p className="">
            <span className="font-semibold ">Booking with:</span>{" "}
            <span className="text-primary font-bold">
              {booking.vruddhas.firstName}
            </span>
          </p>
          <p className="">
            <span className="font-semibold ">Mitra:</span>{" "}
            {booking.mitra.firstName}
          </p>
        </div>
        <BookingBadge currentStatus={status} />
      </div>

      <div className="flex justify-end mt-4">
        <button
          className="btn btn-success text-xs h-8 w-32 rounded-md shadow-sm"
          onClick={handleRedirect}
        >
          See Booking
        </button>
      </div>
    </div>
  );
}

export default TodayBookingCard;
