
import React, { useState, useEffect } from "react";
import "../../style/Contact.css";
import axios from "axios";
import Swal from "sweetalert2";

function AddMain() {
  let apiBaseURL = "http://localhost:5000";
  


  const sessionData = sessionStorage.getItem("token");
  const [values, setValues] = useState({
    admin_number: "",
    password: "",
    email: "",
    role_id: "",

  });

  const [destriData, setDestriData] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { admin_number, password, email, role_id } = values;

    const response = await axios.get(`${apiBaseURL}/auth/getPassword`);

    const generatedPassword = response.data.password;
    const completeStateId = `GK00${email}`;
    const user = {
      password:generatedPassword,
      admin_number,
      email: completeStateId,
      role_id: 2,

    };
    await axios({
      method: "post",
      url: `${apiBaseURL}/auth/createStateId`,
      data: user,
      headers: { Authorization: `Bearer ${sessionData.token}` },
    })
      .then(function (response) {
        if (response.data.status === 200) {
          setValues({
            admin_number: "",
            password: "",


          });
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${response.data.message} !`,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          if (response.data.status == 401) {
            sessionStorage.removeItem("token");
            window.location.reload();
          } else {
            Swal.fire({
              position: "top-end",
              icon: "warning",
              title: "Oops...",
              text: `${response.data.message} !`,
              showConfirmButton: false,
              timer: 1700,
            });
          }
        }
      })
      .catch(function (error) {
        Swal.fire(`Something went wrong!`, "error");
      });
  };



  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  useEffect(() => {

  }, []);


  return (
    <div className="row">
      <div className="col-md-8">
        <div className="card card-outline card-info">
          <div className="card-header">
            <h3 className="card-title">
              <i className="fa-solid fa-user-tie fa-2x" /> Add City Id
            </h3>
          </div>
          <div className="card-body">
            <form method="post" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Select Mini admin</label>
                <select
                  required
                  className="form-control"
                  name="admin_number"
                  value={values.admin_number}
                  onChange={handleChange("admin_number")}
                >
                  <option value="">Select Mini Admin</option>
                  <option value="1">Mini admin 1</option>
                  <option value="2">Mini admin 2</option>
                </select>
              </div>

              <div className="form-group">
                <label>Select State</label>
                <select
                  required
                  className="form-control"
                  name="admin_number"
                  value={values.admin_number}
                  onChange={handleChange("admin_number")}
                >
                  <option value="">Select Sta</option>
                                 </select>
              </div>
              <div className="form-group">
                <label>Select City</label>
                <select
                  required
                  className="form-control"
                  name="admin_number"
                  value={values.admin_number}
                  onChange={handleChange("admin_number")}
                >
                  <option value="">Select City</option>
                                 </select>
              </div>

              <div className="form-group">
                <label>New City Id</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">GK00</span>
                  </div>
                  <input
                    type="text"
                    maxLength={6} 
                    required
                    className="form-control"
                    name="email"
                    value={values.email}
                    onChange={handleChange("email")}
                  />
                </div>
              </div>
            
              <div className="form-group">
                <div className="row">
                  <div className="col-sm-6">
                    <button className="btn btn-primary btn-block">Reset</button>
                  </div>
                  <div className="col-sm-6">
                    <button type="submit" className="btn btn-success btn-block">
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddMain;


