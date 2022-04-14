import React from 'react';
import './App.css';
import{useState} from "react";
import Axios from 'axios'

function App() {

  const[name, setName] = useState('')
  const[age, setAge] = useState(0)
  const[country, setCountry] = useState('')
  const[position, setPosition] = useState('')
  const[wage, setWage] = useState(0)

  const[employeeList, setEmployeeList] = useState([]);

  const addEmployee = ()=>{
    console.log(name);
    Axios.post('http://localhost:3001/create',{
      name: name, 
      age: age, 
      country: country, 
      position: position,
      wage: wage
    }).then(()=>{
    setEmployeeList([
      ...employeeList,
      {
        name: name, 
        age: age, 
        country: country, 
        position: position,
        wage: wage
      },
    ]);
  });
  };

  const getEmployees = () =>{
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
  })
  }
  // const displayInfo= () => {
  //   console.log(name + age + country + position + wage)
  // }

  return (
    <div className="App">
      <div className="information">
      <label>Name: </label>
      <input type="text" placeholder="Name" 
      onChange={(event) => {
        setName(event.target.value);
        }}/>
      <label>Age: </label>
      <input type="number" placeholder="Age" 
      onChange={(event) => {
        setAge(event.target.value);
        }}/>
      <label>Country: </label>
      <input type="text"
      onChange={(event) => {
        setCountry(event.target.value);
        }}/>
      <label>Position: </label>
      <input type="text"
      onChange={(event) => {
        setPosition(event.target.value);
        }}/>
      <label>Wage(year): </label>
      <input type="number"
      onChange={(event) => {
        setWage(event.target.value);
        }}/>
      <button onClick={addEmployee}>Add Employee</button>
      </div>
<div className="employees">      
  <button onClick={getEmployees}>Show Employees</button>
</div>
    
    {employeeList.map
    (
      (value, key) => {
        return <div className="employeeList">
               <h3>Name: {value.name}</h3>
                <h3>Age: {value.age}</h3>
                <h3>Country: {value.country}</h3>
                <h3>Position: {value.position}</h3>
                <h3>Wage: {value.wage}</h3>
          </div>
    })}
    </div>
  );
}

export default App;
