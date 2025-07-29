import capitalize from "../helpers/capitalize";

function BookingBadge({ currentStatus }) {
  let type;
  if (currentStatus === "past") type = "badge-neutral";
  else if (currentStatus === "ongoing") type = "badge-success";
  else type = "badge-info";
  return (
    <div className={`badge ${type} p-2 w-20`}>{capitalize(currentStatus)}</div>
  );
}

export default BookingBadge;
