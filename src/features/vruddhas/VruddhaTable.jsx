import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { useVruddhas } from "./useVruddhas";
import VruddhaRow from "./VruddhaRow";

function VruddhaTable() {
  const { isLoading, vruddhas, count } = useVruddhas();

  if (isLoading) return <Spinner />;

  return (
    <>
      <Table columns="0.7fr 01fr 1fr 1fr 1fr 1fr 0.5fr">
        <Table.Header>
          <div></div>
          <div>Name</div>
          <div>Age</div>
          <div>Gender</div>
          <div>Status</div>
          <div>Visits</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={vruddhas}
          render={(vruddha) => (
            <VruddhaRow vruddha={vruddha} key={vruddha.id} />
          )}
        />

        <Pagination count={count} page={"Vruddhas"} />
      </Table>
    </>
  );
}

export default VruddhaTable;
