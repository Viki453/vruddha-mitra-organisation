import {
  HiMiniFaceSmile,
  HiOutlineBookmarkSquare,
  HiOutlineStar,
} from "react-icons/hi2";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DashboardCard from "../../ui/DashboardCard";
import { getBookingsChartData } from "./getBookingsChartData";
import DashboardDataButton from "../../ui/DashboardDataButton";
import { useSearchParams } from "react-router";
import useGetBookingStats from "../../features/dashboard/useGetBookingStats";
import TodayBookingContainer from "./TodayBookingContainer";

function DashboardWindow() {
  const [searchParams, setSearchParams] = useSearchParams();
  const days = searchParams.get("days") || "10";

  const {
    data: pastBookings = [],
    isLoading,
    error,
  } = useGetBookingStats(days);

  const totalVisits = pastBookings.length;
  const averageRating =
    pastBookings.reduce((acc, cur) => acc + (cur.rating || 0), 0) /
      pastBookings.length || 0;
  const happyIndex = `${Math.round((averageRating / 5) * 100)}%`;

  const cards = [
    {
      label: "Visits",
      icon: <HiOutlineBookmarkSquare />,
      color: "bg-info",
      value: totalVisits,
    },
    {
      label: "Average Ratings",
      icon: <HiOutlineStar />,
      color: "bg-success",
      value: averageRating.toFixed(2),
    },
    {
      label: "Happy Index",
      icon: <HiMiniFaceSmile />,
      color: "bg-warning",
      value: happyIndex,
    },
  ];

  function handleDaysChange(newDays) {
    searchParams.set("days", newDays);
    setSearchParams(searchParams);
  }

  return (
    <div>
      <div className="p-4">
        <DashboardDataButton days={days} onDaysChange={handleDaysChange} />
      </div>

      <div className="grid grid-cols-3 p-5 gap-10">
        {cards.map((card) => (
          <DashboardCard
            label={card.label}
            color={card.color}
            key={card.label}
            value={card.value}
          >
            <div className="flex items-center justify-center w-full">
              {card.icon}
            </div>
          </DashboardCard>
        ))}

        <TodayBookingContainer />

        <div className="w-full bg-base-300 col-span-2 p-5 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">
            Booking Trend (Last {days} Days)
          </h2>
          {isLoading ? (
            <p>Loading chart...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={getBookingsChartData(pastBookings)}>
                <defs>
                  <linearGradient
                    id="colorBookings"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorBookings)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardWindow;
