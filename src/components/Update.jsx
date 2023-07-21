import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_no, setPhone_no] = useState("");
  const [age, setAge] = useState("0");
  const [error, setError] = useState("");

  const { id } = useParams();
  const navigate = useNavigate()

  // get single user data
  const getSingleUser = async () => {
    const response = await fetch(`http://localhost:8080/api/users/${id}`);

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      setError("");
      console.log("updated users", result);
      setName(result.name)
      setEmail(result.email)
      setPhone_no(result.phone_no)
      setAge(result.age)
    }
  };

  //send updated data to backend
  const handleUpdated = async(e) => {
    e.preventDefault();
    const userDetails = { name, email, phone_no, age };
    console.log(userDetails)
    const response = await fetch(`http://localhost:8080/api/users/${id}`, {
      method: "PATCH",
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
     navigate('/all')
    }
  }



  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div>
      <form onSubmit={handleUpdated}
        style={{
          width: "50%",
          margin: "auto",
          padding: "10px",
          textAlign: "left",
        }}
      >
        <div>
          <h4>Edit User's Detail</h4>
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
          Edit User
        </button>
      </form>
    </div>
  );
};

export default Update;
