import BookingTable from "../features/bookings/bookingTable";
import Row from "../ui/Row";
import FilterContainer from "../ui/FilterContainer";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <span className=" text-2xl">Bookings</span>
        <FilterContainer
          filterVals={["upcoming", "past", "ongoing", "pending review"]}
          sortVals={[
            "Oldest First",
            "Latest First",
            "Low Rating First",
            "High Rating First",
          ]}
        />
      </Row>
      <Row type="vertical">
        <BookingTable />
      </Row>
    </>
  );
}

export default Bookings;
