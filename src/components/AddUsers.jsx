import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUsers = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_no, setPhone_no] = useState("");
  const [age, setAge] = useState("0");
  const [error, setError] = useState('')

  const navigate = useNavigate()
  console.log(name, email, phone_no, age);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDetails = { name, email, phone_no, age };
    const response = await fetch("http://localhost:8080/api/users", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    if (!response.ok) {
      console.log(result.error); 
      setError(result.error)
    }
    if (response.ok) {
      console.log(result);
      setError('')
      setName('')
      setEmail('')
      setPhone_no('')
      setAge(0)
      navigate('/all')
    }
  };

  return (
    <div> {error && <div class="alert alert-danger" role="alert">
    This is a danger alert—check it out!
  </div>}
    <form 
      onSubmit={handleSubmit}
      style={{
        width: "50%",
        margin: "auto",
        padding: "10px",
        textAlign: "left",
      }}
    >
   
      <div>
        <h4>Add User Details</h4>
      </div>
      <div className="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label for="exampleInputEmail1">Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label for="exampleInputEmail1">Phone no</label>
        <input
          type="number"
          className="form-control"
          value={phone_no}
          onChange={(e) => setPhone_no(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label for="exampleInputAge">Age</label>
        <input
          type="number"
          className="form-control"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>

      <button type="submit" style={{marginTop: '10px'}} class="btn btn-dark">
        Add User
      </button>
    </form>
    </div>
  );
};

export default AddUsers;
