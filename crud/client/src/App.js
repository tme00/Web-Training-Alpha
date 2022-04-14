import React from 'react';
import './App.css';
import{useState} from "react";
import Axios from 'axios';

function App() {

  const[name, setName] = useState('')
  const[age, setAge] = useState(0)
  const[country, setCountry] = useState('')
  const[position, setPosition] = useState('')
  const[wage, setWage] = useState(0)

  const [newWage, setNewWage] = useState(0);
  

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
  });
  };

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", {wage: newWage, id: id}).then(
      (response)=>{
        alert("Updated!");
        setEmployeeList(employeeList.map((value)=> {
          return value.id == id ? {id: value.id, name: value.name, age: value.age, country: value.country, position:value.position, wage:newWage} : value 
        })
        )
      }
      );
  }

const deleteEmployee= (id) => {
  Axios.delete(`http://localhost:3001/delete/${id}`).then((response)=>{
    setEmployeeList(employeeList.filter((val)=>{
      return val.id!=id
    }))
  });
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
        }}
        />
      <button onClick={addEmployee}>Add Employee</button>
      </div>
<div className="employees">      
  <button onClick={getEmployees}>Show Employees</button>
</div>
    
    {employeeList.map
    (
      (value, key) => {
        return <div className="employeeList">
          <div>
               <h3>Name: {value.name}</h3>
                <h3>Age: {value.age}</h3>
                <h3>Country: {value.country}</h3>
                <h3>Position: {value.position}</h3>
                <h3>Wage: {value.wage}</h3>
                </div>
                <div> 
                  <input type ="text" placeholder="2000..."
                  onChange={(event) => {
                    setNewWage(event.target.value);
                    }}
                  />
                  <button 
                  onClick=
                  {()=>{updateEmployeeWage(value.id)}
                  }
                  >
                    {" "}
                    Update
                    </button>

                    <button
                  onClick={() => {
                    deleteEmployee(value.id);
                  }}
                >
                  Delete
                </button>
                </div>
          </div>
    })}
    </div>
  );
}

export default App;
