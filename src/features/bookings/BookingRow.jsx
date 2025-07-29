import { formatDateBookings } from "../../helpers/dateFunctions";
import Table from "../../ui/Table";
import { format, getDate, getDay } from "date-fns";
import Button from "../../ui/Button";
import BookingBadge from "../../ui/BookingBadge";
import { HiInformationCircle } from "react-icons/hi2";
import { redirect, replace, useNavigate, useSearchParams } from "react-router";

function BookingRow({ data }) {
  const {
    id,
    date,
    rating,
    mitra: { firstName: mitra, avatar },
    status,
    vruddhas: { firstName: vruddha },
  } = data;
  const { day, formattedDate } = formatDateBookings(date);
  const navigate = useNavigate();

  function handleInfoRedirect(id) {
    navigate(`/booking/${id}`, { replace: true });
  }
  console.log(avatar);
  return (
    <Table.Row>
      <img
        className="flex justify-center items-center h-15 w-30 text-accent-content object-cover"
        src={avatar}
      />
      <div>{mitra}</div>
      <div>{vruddha}</div>
      <div className="flex flex-col ">
        <p>
          {formattedDate}, ({day})
        </p>
      </div>
      <div>
        <BookingBadge currentStatus={status} />
      </div>
      <div>
        {rating
          ? rating
          : status == "past" && <p className=" text-error">Not Reviewed</p>}
      </div>
      <div className="text-md">
        <button onClick={() => handleInfoRedirect(id)}>
          <HiInformationCircle />
        </button>
      </div>
    </Table.Row>
  );
}

export default BookingRow;
