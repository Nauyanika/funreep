import React, { useState, useEffect } from "react";
// import '../../style/Contact.css'
import axios from "axios";
import Swal from "sweetalert2";
function ChangeUserPassword() {
  let apiBaseURL = "http://localhost:5000"; 
  const [values, setValues] = useState({
    distributor_id: "",
    password: "",
    newPassword: "", 
  });
  const [value1, setValues1] = useState({
    user_id: "",
    uPassword: "",
    unewPassword: "", 
  });
  const [userData, setUserData] = useState([]);
  const [destriData, setDestriData] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { user_id,uPassword, unewPassword } = value1; 
    const user = { password:uPassword, roleId:3, user_id ,confirm_password:unewPassword}; 
    await axios
      .post(`${apiBaseURL}/api/users/resetPassword`, user)
      .then(function (response) {
        if (response.data.status === 200) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: response.data.message,
                showConfirmButton: true,
                timer: 1500,
              });
              setValues1({
                user_id: "",
                uPassword: "",
                unewPassword: "", 
              })
        }else{
          if(response.data.status == 401) {
            sessionStorage.removeItem("token");
            window.location.reload();
          } else {
            Swal.fire({
              position: "top-end",
              icon: "warning",
              title: "Oops...",
              text:`${response.data.message} !`,
              showConfirmButton: false,
              timer: 1700,
            });
          }
        }
      })
      .catch(function (error) {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Someting Went wrong!",
            showConfirmButton: true,
            timer: 1500,
          });
      });
  };
  const handleSubmit1= async (e) => {
    e.preventDefault();
    const { distributor_id,password, newPassword } = values; 
    const user = { password, roleId:2, distributor_id ,confirm_password:newPassword};
    console.log(user)
    await axios
      .post(`${apiBaseURL}/api/users/resetPassword`, user)
      .then(function (response) {
        if (response.data.status === 200) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: response.data.message,
                showConfirmButton: true,
                timer: 1500,
              });
              setValues({
                user_id: "",
                password: "",
                newPassword: "", 
              })
        }else{
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: response.data.message,
                showConfirmButton: true,
                timer: 1500,
              });
        }
      })
      .catch(function (error) {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Someting Went wrong!",
            showConfirmButton: true,
            timer: 1500,
          });
      });
  };
//get Agents
const getUsers = async () => {
    await axios
      .get(`${apiBaseURL}/api/users/`)
      .then(function (response) {
        if (response.data.status === 200) { 
          setUserData(response.data.data); 
        }
      })
      .catch(function (error) {
      
      });
  };
  //get Agents
  const getAgents = async () => {
    await axios
      .get(`${apiBaseURL}/api/users/agents`)
      .then(function (response) {
        if (response.data.status === 200) {
          console.log(response.data, "data");
          setDestriData(response.data.data);
          console.log(destriData);
        }
      })
      .catch(function (error) {
        // history.push("/login")
      });
  };
  //
  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  const handleChange1 = (name) => (e) => {
    setValues1({ ...value1, [name]: e.target.value });
  };
  useEffect(() => {
    getAgents();
    getUsers();
  }, []);

  return (
      <div className="row">
        <div className="col-md-6">
          <div className="card card-outline card-info">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fa-solid fa-key nav-icon fa-2x" /> Reset Players
                Password
              </h3>
            </div>
            <div className="card-body">
              <form method="post" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="username">Username / Players*</label>
                      <select
                        name="user_id"
                        value={value1.user_id}
                        onChange={handleChange1("user_id")}
                        className="inputfield form-control"
                        placeholder="Username*"
                      >
                        <option value="">Select User</option>
                        {userData.map((item, index) => {
                          return (
                            <option value={item.user_id} key={index}>
                              {item.username?item.username:`Guest${index}`}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6"></div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="username">New Password *</label>
                      <input
                        type="password"
                        value={value1.uPassword}
                        onChange={handleChange1("uPassword")}
                        name="uPassword"
                        className="inputfield form-control"
                        placeholder="*******"
                      />
                    </div>
                  </div>
                  <div className="col-md-6"></div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="unewPassword">Confirm Password *</label>
                      <input
                        type="text"
                        name="unewPassword"
                        value={value1.unewPassword}
                        onChange={handleChange1("unewPassword")}
                        className="inputfield form-control"
                        placeholder="*******"
                      />
                    </div>
                  </div>
                  <div className="col-md-6"></div>
                  <div className="col-md-4 ">
                    <div className="form-group">
                      <button type='onSubmit'className="btn-primary form-control"> 
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card card-outline card-info">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fa-solid fa-key nav-icon fa-2x" />Reset Admin
                Password
              </h3>
            </div>
            <div className="card-body">
              <form method="post" onSubmit={handleSubmit1}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="username">Username / Admin *</label>
                      <select
                        name="distributor_id"
                        value={values.distributor_id}
                        onChange={handleChange("distributor_id")}
                        className="inputfield form-control"
                        placeholder="Username*"
                      >
                        <option value="">Select User</option>
                        {destriData.map((item, index) => {
                          return (
                            <option value={item.distributor_id} key={index}>
                              {item.username}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6"></div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="password">New Password *</label>
                      <input
                        type="password"
                        value={values.password}
                        onChange={handleChange("password")}
                        name="password"
                        className="inputfield form-control"
                        placeholder="*******"
                      />
                    </div>
                  </div>
                  <div className="col-md-6"></div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="newPassword">Confirm Password *</label>
                      <input
                        type="text"
                        name="newPassword"
                        value={values.newPassword}
                        onChange={handleChange("newPassword")}
                        className="inputfield form-control"
                        placeholder="*******"
                      />
                    </div>
                  </div>
                  <div className="col-md-6"></div>
                  <div className="col-md-4 ">
                    <div className="form-group">
                      <button type="onSubmit" className="btn-primary form-control"> 
                        Reset
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
export default ChangeUserPassword;
