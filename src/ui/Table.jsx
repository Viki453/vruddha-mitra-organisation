import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  display: flex;
  flex-direction: column;

  background-color: var(--color-base-300);
  border-radius: 7px;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  row-gap: 10px;
  column-gap: 10px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledHeader = styled(CommonRow)`
  background-color: var(--color-base-100);
  font-weight: bold;
  font-size: 1.5em;
  padding: 10px;
  border-bottom: solid var(--color-base-00);
`;

const StyledRow = styled(CommonRow)`
  padding: 10px;
  font-size: 1rem;
  border-bottom: solid var(--color-base-100);
`;

const TableContext = createContext();

function Table({ children, columns }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable className=" flex flex-col m-[0_auto] p-2 gap">
        {children}
      </StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return <StyledHeader columns={columns}>{children}</StyledHeader>;
}

function Body({ data, render }) {
  if (!data.length) return <p>No data to show at the moment</p>;
  return <div>{data.map(render)}</div>;
}

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return <StyledRow columns={columns}>{children}</StyledRow>;
}

function Footer() {
  return <div>Footer</div>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
