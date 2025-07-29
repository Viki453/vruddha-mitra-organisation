import capitalize from "../helpers/capitalize";

function Badge({ currentStatus }) {
  return (
    <div
      className={`badge ${
        currentStatus === "idle" ? "badge-success" : "badge-neutral"
      } w-[70px]`}
    >
      {capitalize(currentStatus)}
    </div>
  );
}

export default Badge;
