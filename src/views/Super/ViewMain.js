
import React, { useState, useEffect } from "react";
import MaterialTable from "material-table"; 
import "../../style/Contact.css";
import axios from "axios";
import moment from "moment"
import Swal from 'sweetalert2'  

function ViewMain() {
  let apiBaseURL  = "http://localhost:5000"
 //let apiBaseURL  = "http://localhost:5000"

  const [data, setData] = useState([]);
  const [currentRow, setCurrentRow] = useState(null);

  //get Agents
  const getPlayers = async () => {
    await axios
      .get(`${apiBaseURL}/user/getSuperMasterData`)
      .then(function (response) {
        if (response.data.status === 200) {
          console.log(response.data, "data");
          setData(response.data.data);
        }
      })
      .catch(function (error) {
        // history.push("/login")
      });
  };
 

const columns = [
  { title: "Sl No.", field: "id" },
  { title: "Fullname", field: "full_name" },
  { title: "Email", field: "email" },
  { title: "Point", field: "point" },
  { title: "Password", field: "password" },
  {
    title: "",
    render: (rowData) => (
      <button
        className="btn btn-danger ml-2"
        onClick={() =>
          handleEdit(rowData, apiBaseURL, getPlayers, rowData.full_name)
        }
      >
        Edit
      </button>
    ),
  },
];


  useEffect(() => {
    getPlayers();
  }, []);

  return ( 
    <div className="card card-outline card-info"  >
      <MaterialTable
        title="Super Master List"
        data={data}
        columns={columns}
        options={{ actionsColumnIndex: -1 }}
      />
        {currentRow && (
        <EditForm
          row={currentRow}
          onClose={() => setCurrentRow(null)}
          apiBaseURL={apiBaseURL}
          getPlayers={getPlayers}
        />
      )}
    </div> 
  );
}



const handleEdit = async (rowData, apiBaseURL, getPlayers, firstName) => {
  const { id, password } = rowData;
  const newPassword = prompt(
    "Enter new password (leave blank to keep current password)"
  );
  const newFirstName = prompt("Enter new first name", firstName);

  // Check if the user cancelled the prompt for the new first name or new password
  if (newFirstName === null || newPassword === null) {
    return;
  }

  axios
    .put(`${apiBaseURL}/user/updateSuperMaster`, {
      id,
      full_name: newFirstName,
      password: newPassword || null,
    })
    .then(function (response) {
      if (response.status === 200) {
        Swal.fire("Success", response.data.message, "success").then(() =>
          getPlayers()
        );
      } else {
        Swal.fire("Error", response.data.message, "error");
      }
    })
    .catch(function (error) {
      Swal.fire("Error", "Something went wrong", "error");
    });
};

function EditForm({ row, onClose, apiBaseURL, getPlayers }) {
  const [firstName, setFirstName] = useState(row.full_name);
  const [password, setPassword] = useState(row.password);

  const handleSave = async () => {
    try {
      const updatedData = {
        id: row.id,
        full_name: firstName,
        password: password,
      };
  
      await axios.put(`${apiBaseURL}/user/updateSuperMaster`, updatedData);
  
      onClose();
      getPlayers();
      alert("SuperMaster updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update SuperMaster");
    }
  };
  

  return (
    <div>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}



export default ViewMain;
