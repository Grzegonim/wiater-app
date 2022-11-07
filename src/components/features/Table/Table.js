import { removeTableRequest } from "../../../redux/tableReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Col, Row, Modal } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import style from './Table.module.scss'

const Table = ({id, status, number}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  const handleRemove = () => {
    dispatch(removeTableRequest(id));
    navigate("/");
  };
  
  return (
    <Row className="justify-content-between border-bottom pb-4 pt-4">
      <Col xl={6} className="d-flex align-items-end">
        <h2 className="mb-0">Table {number + 1}</h2>
        <p className={style.status}><b>Status: </b>{ status }</p>
      </Col>
      <Col xl={6} className="justify-content-end d-flex">
        <Link as={NavLink} to={"/table/" + id}><Button variant="primary">Show more</Button></Link>
        <Button variant={"danger"} className={style.removeButton} onClick={handleOpen}>Remove</Button>
      </Col>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are You sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>The operation will completly remove your table. Do you want to continue?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleRemove}>
              Remove
            </Button>
          </Modal.Footer>
      </Modal>
    </Row>
  )
};

export default Table; 
