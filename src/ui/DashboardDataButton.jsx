function DashboardDataButton({ days, onDaysChange }) {
  function handleClick(event) {
    onDaysChange(event.target.value);
  }

  return (
    <select
      value={days}
      className="select select-accent"
      onChange={handleClick}
    >
      <option value="10">Last 10 Days</option>
      <option value="30">Last 30 Days</option>
      <option value="60">Last 60 Days</option>
    </select>
  );
}

export default DashboardDataButton;
