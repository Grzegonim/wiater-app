import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTableById } from "../../../redux/tableReducer";
import TableHook from '../TableHook/TableHook';
import { Button, Form, Spinner } from "react-bootstrap";
import shortid from "shortid";
import style from './TableForm.module.scss'

const TableForm = () => {
  const { id } = useParams();
  const table = useSelector(state => getTableById(state, id));
  const {
    tableStatus,
    maxPeopleAmount,
    peopleAmount,
    bill,
    handleSubmit, 
    selectStatus, 
    statuses,
    setPeople,
    setMaxPeople,
    setBill
  } = TableHook(table);

  if(!table) return <Spinner animation="border" variant="primary" />;
  return (
    <div>
      <h1>Table {table.id}</h1>
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
        <Button className="mt-2" type="submit">Update</Button>
      </Form>
    </div>
  )
};

export default TableForm;