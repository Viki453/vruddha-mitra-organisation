import { useSearchParams } from "react-router";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import BookingRow from "./BookingRow";
import { useBookings } from "./useBookings";
import useSeeAllBookings from "../vruddhas/useSeeAllBookings";
import Pagination from "../../ui/Pagination";
import { updateOldBookingsToPast } from "../../services/apiBookings";
import { useEffect } from "react";

function BookingTable() {
  const [searchParams] = useSearchParams();
  const vID = searchParams.get("id");

  useEffect(() => {
    updateOldBookingsToPast().catch(console.error);
  }, []);
  const {
    bookings: allVBookings,
    isLoading: isLoadingAllVBookings,
    count: allCount,
  } = useSeeAllBookings();
  const { bookings, isLoading, count } = useBookings();

  const data = vID ? allVBookings : bookings;
  const total = vID ? allCount : count;

  if ((vID && isLoadingAllVBookings) || (!vID && isLoading)) return <Spinner />;
  if ((vID && data?.length === 0) || (!vID && total === 0))
    return <div>No bookings found</div>;

  return (
    <>
      <Table columns="1fr 1fr 1fr 1.5fr 1fr 1fr 0.7fr">
        <Table.Header>
          <div></div>
          <div>Mitra</div>
          <div>Vruddha</div>
          <div>Date</div>
          <div>Status</div>
          <div>Rating</div>
          <div></div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={data}
          render={(booking) => <BookingRow data={booking} key={booking.id} />}
        />
        {!vID && <Pagination count={count} page={"Bookings"} />}
      </Table>
    </>
  );
}

export default BookingTable;
