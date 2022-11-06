import { getTables } from "../../../redux/tableReducer";
import { useSelector } from "react-redux";
import Table from "../../features/Table/Table";
import {Button, Spinner} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const Home = () => {
  const tables = useSelector(getTables);
  return (
    <div>
      {(tables.length === 0) && <Spinner animation="border" variant="primary" />}
      <div className="d-flex justify-content-between align-items-center">   
        <h1>All tables</h1><Link as={NavLink} to={"/newtable"}><Button variant="primary">Add Table</Button></Link>
      </div>

        {tables.map(table => <Table 
        id={table.id}
        status={table.status}
        key={table.id}  
        />
        )}
    </div>  
  )  
};

export default Home;