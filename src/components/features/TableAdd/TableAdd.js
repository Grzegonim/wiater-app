import { addTableRequest } from "../../../redux/tableReducer";
import { getStatuses } from "../../../redux/statusesReducer";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import shortid from "shortid";
import style from './TableAdd.module.scss'

const TableAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const statuses = useSelector(getStatuses);
  const [ tableStatus, setTableStatus ] = useState('Free');
  const [ maxPeopleAmount, setMaxPeople ] = useState('');
  const [ peopleAmount, setPeople ] = useState('0');
  const [ bill, setBill ] = useState('');

  const selectStatus = e => {
    e.preventDefault();
    setTableStatus(e.target.value);
    if(e.target.value === 'Cleaning' || e.target.value === 'Free'){
      setPeople('0')
    };
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addTableRequest({id: shortid(), status: tableStatus, maxPeopleAmount, peopleAmount, bill}));
    navigate("/");
  };

  return (
    <div>
      <h1>New table</h1>
      <Form onSubmit={e => handleSubmit(e)}>
        <Form.Group className="d-flex align-items-center mb-2">
          <div>
            <Form.Label className={style.label}><b>Status: </b></Form.Label>
          </div>
          <Form.Select className={style.selectStatus} onChange={e => selectStatus(e)} value={tableStatus}>
            {statuses.map(status => <option key={shortid()} value={status}>{status}</option>)}
          </Form.Select>
        </Form.Group>
        <Form.Group className="d-flex align-items-center mb-2">
          <Form.Label className={style.label}><b>People: </b></Form.Label>
          <Form.Control
            className={style.people}
            type="number"
            value={peopleAmount}
            min="0" 
            max={maxPeopleAmount} 
            onChange={e => setPeople(e.target.value)}
            ></Form.Control>
            <p className="mb-0">/</p>
          <Form.Control
            className={style.people}
            type="number" 
            value={maxPeopleAmount} 
            max="10" 
            min="0"
            onChange={e => setMaxPeople(e.target.value)}
            >
          </Form.Control>
        </Form.Group>
        {tableStatus === "Busy" && 
          <Form.Group className="d-flex align-items-center mb-2">
            <Form.Label className={style.label}><b>Bill: </b></Form.Label>
            <Form.Control
              className={style.bill}
              type="number" 
              defaultValue={bill}
              min="0"
              onChange={e => setBill(e.target.value)}
            >
            </Form.Control>
              <p className="mb-0">$</p>
          </Form.Group>
        }
        <Button className="mt-2" type="submit">Add Table</Button>
      </Form>
    </div>
  )
};

export default TableAdd;