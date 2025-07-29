import VruddhaForm from "../features/vruddhas/VruddhaForm";
import VruddhaTable from "../features/vruddhas/VruddhaTable";
import Modal from "../ui/Modal";
import Row from "../ui/Row";
import FilterContainer from "../ui/FilterContainer";
import Pagination from "../ui/Pagination";

function Vruddhas() {
  return (
    <>
      <Row type="horizontal">
        <span className=" text-2xl">Vruddhas</span>
        <FilterContainer
          filterVals={["idle", "occupied"]}
          sortVals={["A-Z", "Z-A"]}
        />
      </Row>
      <Row type="vertical">
        <VruddhaTable />
        <div>
          <Modal type="Registration Form" label="Add Vruddha">
            <VruddhaForm />
          </Modal>
        </div>
      </Row>
    </>
  );
}

export default Vruddhas;
