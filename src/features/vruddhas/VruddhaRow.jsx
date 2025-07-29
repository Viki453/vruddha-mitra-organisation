import { useNavigate, useSearchParams } from "react-router";
import styled from "styled-components";
import Badge from "../../ui/Badge";
import Gender from "../../ui/Gender";
import Menu from "../../ui/Menu";
import Table from "../../ui/Table";
import { useCreateVruddha } from "./useCreateVruddha";
import useDeleteVruddha from "./useDeleteVruddha";

const StyledImage = styled.img`
  border-radius: 10px;
  max-width: 100%;
  overflow: hidden;
  background-position: center;
  object-fit: cover;
`;

function VruddhaRow({ vruddha }) {
  const { deleteVruddha, isDeleting } = useDeleteVruddha();
  const { isCreatingVruddha, createVruddha } = useCreateVruddha();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    id,
    firstName,
    age,
    gender,
    currentStatus,
    image,
    visits,
    description,
    advise,
  } = vruddha;

  function handleDuplicate() {
    createVruddha({
      firstName: `${firstName}'s duplicate`,
      age,
      gender,
      currentStatus,
      image,
      visits,
      description,
      advise,
    });
  }

  function handleInfo(id) {
    navigate(`/vruddhas/${id}`);
  }

  return (
    <>
      <Table.Row>
        <img
          className="flex justify-center items-center h-15 w-35 text-accent-content object-cover"
          src={image}
        />
        <div>{firstName}</div>
        <div>{age}</div>
        <div className=" flex justify-center">
          <Gender gender={gender} />
        </div>
        <div>
          <div>
            <Badge currentStatus={currentStatus} />
          </div>
        </div>
        <div>{visits}</div>
        <Menu
          content={[
            { id: "info", label: "Info" },
            { id: "edit", label: "Edit" },
            { id: "delete", label: "Delete" },
          ]}
        >
          <button
            id="duplicate"
            onClick={handleDuplicate}
            disabled={isCreatingVruddha}
          >
            Duplicate
          </button>
          <button id="info" onClick={() => handleInfo(id)}>
            Info
          </button>

          <button
            id="delete"
            onClick={() => deleteVruddha(id)}
            disabled={isDeleting}
          >
            Delete
          </button>
        </Menu>
      </Table.Row>
    </>
  );
}

export default VruddhaRow;
