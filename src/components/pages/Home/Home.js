import { getTables } from "../../../redux/tableReducer";
import { useSelector } from "react-redux";
import Table from "../../features/Table/Table";
import {Button, Spinner} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const Home = () => {
  const tables = useSelector(getTables);
  console.log(tables.length)
  return (
    <div>
      {(tables.length === 0) && <Spinner animation="border" variant="primary" />}      
      <h1>All tables</h1><Link as={NavLink} to={"/newtable"}><Button variant="primary">Add Table</Button></Link>

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