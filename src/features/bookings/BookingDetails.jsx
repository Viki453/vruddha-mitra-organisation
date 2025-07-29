import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { isSameDay, parseISO } from "date-fns";
import { useParams } from "react-router";
import { formatDateBookings } from "../../helpers/dateFunctions";
import BookingBadge from "../../ui/BookingBadge";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import Review from "./Review";
import useBookingDetails from "./useBookingDetails";
import useChangeBookingStatus from "./useChangeBookingStatus";

function BookingDetails() {
  const { id } = useParams();
  const { booking, isLoadingBooking } = useBookingDetails();
  const { mutate, isLoading } = useChangeBookingStatus();

  if (isLoadingBooking) return <Spinner />;
  if (!booking?.[0]) return <div>No data found</div>;

  const handleStatusChange = (action) => {
    const proceed = window.confirm(
      action.newStatus === "ongoing"
        ? "Do you want to start this visit?"
        : "Do you want to end this visit?"
    );
    if (proceed && !isLoading) {
      mutate(action);
    }
  };
  const {
    date,
    created_at,
    status,
    review,
    rating,
    mitra: {
      firstName: mFirstName,
      lastName: mLastName,
      emailId,
      phoneNo,
      ratings,
      description,
      languages,
    },
    vruddha: { firstName: vFirstName, lastName: vLastName },
  } = booking[0];

  const { formattedDate: bookedOn } = formatDateBookings(created_at);
  const { formattedDate: visitDate } = formatDateBookings(date);

  return (
    <div className="flex justify-center items-center flex-col gap-8 px-4 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-base-100 p-10 text-lg w-full max-w-5xl rounded-lg shadow-md">
        <div className="text-3xl font-bold">Booking ID: #{id}</div>
        <div className="flex flex-col items-end gap-1 text-right">
          <BookingBadge currentStatus={status} />
          <div className="text-sm text-gray-500">Booked on: {bookedOn}</div>
        </div>

        <div className="col-span-full border-t pt-6 mt-2">
          <h2 className="text-2xl font-semibold">Booking With:</h2>
          <p className="mt-1">
            {vFirstName} {vLastName}
          </p>
          <p className="text-sm text-gray-500 mt-1">Visit Date: {visitDate}</p>
        </div>

        <div className="text-2xl font-semibold mt-6">Mitra Details:</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 col-span-full">
          <div>
            Name: {mFirstName} {mLastName}
          </div>
          <div>
            Rating:{" "}
            <Box>
              <Rating name="read-only" value={ratings} readOnly />
            </Box>
          </div>
          <div>Phone: +91-{phoneNo}</div>
          <div>Email: {emailId}</div>
          <div className="">About me: {description}</div>
          <div>Languages: {languages}</div>
        </div>

        {status == "past" && review ? (
          <div className="col-span-full mt-6 border-t pt-6">
            <h2 className="text-xl font-semibold mb-2">Your Rating & Review</h2>
            <Box>
              <Rating name="read-only" value={rating} readOnly />
            </Box>
            <p className="mt-2">
              <span className="font-semibold">Review:</span>{" "}
              {review || "Not submitted yet."}
            </p>
          </div>
        ) : (
          ""
        )}

        <div className="col-span-full flex justify-end mt-6">
          {status !== "past" &&
            (status === "upcoming" ? (
              <button
                className="btn btn-success text-lg"
                disabled={!isSameDay(parseISO(date), new Date()) || isLoading}
                onClick={() => handleStatusChange({ newStatus: "ongoing", id })}
              >
                Start Visit?
              </button>
            ) : (
              <button
                className="btn btn-success text-lg"
                disabled={
                  status === "upcoming" || status === "past" || isLoading
                }
                onClick={() => handleStatusChange({ newStatus: "past", id })}
              >
                Finish Visit?
              </button>
            ))}
        </div>
      </div>

      {!review && status === "past" && (
        <Modal label="Write a Review">
          <Review />
        </Modal>
      )}
    </div>
  );
}

export default BookingDetails;
