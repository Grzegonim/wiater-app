import { editTableRequest } from "../../../redux/tableReducer";
import { getStatuses } from "../../../redux/statusesReducer";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const TableHook = (table) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const statuses = useSelector(getStatuses);
  const [ tableStatus, setTableStatus ] = useState(table ? table.status : null);
  const [ maxPeopleAmount, setMaxPeople ] = useState(table ? table.maxPeopleAmount : null);
  const [ peopleAmount, setPeople ] = useState(table ? table.peopleAmount : null);
  const [ bill, setBill ] = useState(table ? table.bill : null);
  const selectStatus = e => {
    e.preventDefault();
    setTableStatus(e.target.value)
    if(e.target.value === 'Cleaning' || e.target.value === 'Free'){
      setBill('0')
      setPeople('0')
    }
  };
  const handleSubmit = e => {
    e.preventDefault()
    dispatch(editTableRequest( {status: tableStatus, maxPeopleAmount, peopleAmount, bill, id: table.id.toString() } ))
    navigate(-1)
  };

  return {
    statuses,
    tableStatus,
    maxPeopleAmount,
    peopleAmount,
    bill,
    selectStatus,
    handleSubmit,
    setTableStatus,
    setMaxPeople,
    setPeople, 
    setBill
  }
};

export default TableHook;