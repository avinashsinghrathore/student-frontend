import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const getData = async () => {
    const response = await fetch("http://localhost:8080/api/users");

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      setData(result);
    }
  };

  // delete data
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:8080/api/users/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      setError("Data Deleted");

      setTimeout(() => {
        setError("");
        getData();
      }, 1000);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <>
      <h3>All Users</h3>
      <table
        class="table table-striped"
        style={{ width: "90%", margin: " 30px auto 0 auto" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#000000", color: "#fff" }}>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone no</th>
            <th scope="col">Age</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((data) => (
            <tr>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.phone_no}</td>
              <td>{data.age}</td>
              <td>
                <Link
                  type="button"
                  class="btn btn-success"
                  style={{ marginRight: "5px" }}
                  to={`/${data._id}`}
                >
                  Edit
                </Link>

                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() => handleDelete(data._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AllUsers;
