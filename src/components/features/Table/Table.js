import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import style from '../Table.module.scss'

const Table = ({ id, status }) => {
  return (
    <Row className="justify-content-between border-bottom pb-4 pt-4">
    <Col xl={6} className="d-flex align-items-end">
      <h2 className="mb-0">Table {id}</h2>
      <p className={style.status}><b>Status: </b>{ status }</p>
    </Col>
    <Col xl={6} className="justify-content-end d-flex">
      <Link as={NavLink} to={"/table/" + id}><Button variant="primary">Show more</Button></Link>
    </Col>
    </Row>
  )
};

export default Table; 
