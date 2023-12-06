
import React, { useState } from "react"; 
import "../../style/Contact.css";
import axios from "axios";
import Swal from "sweetalert2";
 
function ChangePassword() {
  let apiBaseURL  = "http://localhost:5000"
  const [values, setValues] = useState({
    newpassword: "",
    confirmPassword: "",
  });
  const tokenData = sessionStorage.getItem('token'); 
  const handleSubmit = async (e) =>{
    e.preventDefault();  
    const { newpassword, confirmPassword } = values;
    const user = {email:"admin@admin.com" ,old_password:newpassword, new_password:confirmPassword };
    await axios({
        method: 'POST',
        url: `${apiBaseURL}/auth/resetPassword`,
        data: user,
        headers: {"Authorization" : `Bearer ${tokenData.token}`}
      }).then(function (response) { 
        if (response.data.status === 200) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Success! Thank you..",
            text: "Password updated",
            timer: 1700,
          }); 
          setValues({
            newpassword: "",
            confirmPassword: "",
          });
        } else {
          if (response.data.status == 401) {
            Swal.fire({
              position: "top-end",
              icon: "warning",
              title: "Oops...",
              text:`${response.data.message} !`,
              showConfirmButton: false,
              timer: 1700,
            });
            //sessionStorage.removeItem("token");
            //window.location.reload();
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
        console.log(error)
    }); 
  };

 
  //
  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  return ( 
      <div className="row">
        <div className="col-md-8">
          <div className="card card-outline card-info">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fa-solid fa-user-tie fa-2x" /> Change Password
              </h3>
            </div>
            <div className="card-body">
              <form method="post" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="newpassword">Old Password *</label>
                        <input
                          type="password"
                          value={values.newpassword}
                          onChange={handleChange("newpassword")}
                          name="newpassword"
                          className="inputfield form-control"
                          placeholder="*******"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="confirmPassword">New Password *</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={values.confirmPassword}
                          onChange={handleChange("confirmPassword")}
                          className="inputfield form-control"
                          placeholder="*******"
                        />
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="form-group">
                        <button type="submit"className="btn-primary form-control">     
                          Update
                        </button>
                      </div>
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
export default ChangePassword;
