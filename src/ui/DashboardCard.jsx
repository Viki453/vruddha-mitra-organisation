function DashboardCard({ children, label, color, value }) {
  return (
    <div className=" bg-base-300 w-full h-40 p-5 grid grid-cols-3 text-base items-center content-center gap-1">
      <div className="col-span-2 text-3xl text-center">{label}</div>
      <div
        className={`text-5xl ${color} row-span-2 flex justify-center text-base-200 items-center p-1 rounded-full h-20 w-20`}
      >
        {children}
      </div>
      <div className="col-span-2 text-center text-2xl">{value}</div>
    </div>
  );
}

export default DashboardCard;
