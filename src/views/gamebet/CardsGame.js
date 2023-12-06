import React, { useState, useEffect } from "react";
import "../../style/Contact.css";
import axios from "axios";
import { apiBaseURL } from "../../config";
import MaterialTable from 'material-table'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Swal from "sweetalert2";

// import { authToken } from "../../../authToken";
function CardsGame() {

  const [data, setData] = useState([])
  const [value1, setvalue1] = useState("")
  const [value2, setvalue2] = useState("")
  
  const columns = [
    { title: "Serial No", render: (rowData) => rowData.tableData.id + 1 },
   // { title: "Player ID", field: "playername" },

   { title: "RoundCount", field: "RoundCount" },
   { title: "Betvalue2to6", field: "singleNo" },
   { title: "Betvalue7", field: "doubleNo" },
   { title: "Betvalue8to12", field: "tripleNo" },

   // { title: "WinType", field: "wintype" },

    //{ title: "Win_finalNo", field: "Win_finalNo" },

    {
      title: "Date & Time",
      render: (rowData) =>
        moment(rowData.playedTime).format("DD-MM-YYYY h:mm:ss "),
    },
  ]

  useEffect(() => {
    axios
    //  .get(`${apiBaseURL}/user/SevenUpGamePlayHistory`)
    .get(`${apiBaseURL}/user/gamerunning`)

      .then(function (response) {
        if (response.data.status === 200) {
          console.log(response.data, "data");
          const result = response.data.data.filter((item) => {
            return item.email != "admin@admin.com"

          })
          setData(result);

          // setData(response.data.data);
        }
      })
      .catch(function (error) {
        // history.push("/login")
      });
  }, [])



  useEffect(() => {
    axios
      // .get(`${apiBaseURL}/user/PointHistory`)
      .get(`${apiBaseURL}/user/getAdmin7up`)

      .then(function (response) {
        if (response.data.status === 200) {
          console.log(response.data, "data");
          setvalue1(response.data.data.value1)
          setvalue2(response.data.data.value2)

          // setData(response.data.data);
        }
      })
      .catch(function (error) {
        // history.push("/login")
      });
  }, [])







  const [countDown, setCountDown] = React.useState(0);
  const [runTimer, setRunTimer] = React.useState(false);

  React.useEffect(() => {
    let timerId;

    if (runTimer) {
      setCountDown(60 * 5);
      timerId = setInterval(() => {
        setCountDown((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [runTimer]);

  React.useEffect(() => {
    if (countDown < 0 && runTimer) {
      console.log("expired");
      setRunTimer(false);
      setCountDown(0);
    }
  }, [countDown, runTimer]);

  const togglerTimer = () => setRunTimer((t) => !t);

  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);


  //checkbox selection
  const [dice1SelectedCheckbox, setDice1SelectedCheckbox] = useState("");
  const [dice2SelectedCheckbox, setDice2SelectedCheckbox] = useState("");
  const [resultSelectedCheckbox, setResultSelectedCheckbox] = useState("");

  


  const handleDice1CheckboxChange = (value) => {
    if (dice1SelectedCheckbox === value) {
      setDice1SelectedCheckbox("");
    } else {
      setDice1SelectedCheckbox(value);
    }
  };

  const handleDice2CheckboxChange = (value) => {
    if (dice2SelectedCheckbox === value) {
      setDice2SelectedCheckbox("");
    } else {
      setDice2SelectedCheckbox(value);
    }
  };

  //clear button
  const handleClearButtonClick = (event) => {
    event.preventDefault();
    setDice1SelectedCheckbox("");
    setDice2SelectedCheckbox("");
    setvalue1(-1)
    setvalue2(-1)

    axios.post("http://13.48.18.24:5000/user/Admin7up",{value1:-1,value2:-1})
  
    .then((data)=>{
  console.log(data)

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Admin controller Reset",
    showConfirmButton: false,
    timer: 1500,
  });

    })
    .catch((error)=>{
      console.log(error)
    })
  };

  // Save end 
  const handleSaveButtonClick=(event)=>{
    event.preventDefault();
    setvalue1(dice1SelectedCheckbox);
    setvalue2(dice2SelectedCheckbox);

    axios.post("http://13.48.18.24:5000/user/Admin7up",{value1:dice1SelectedCheckbox,value2:dice2SelectedCheckbox})
  
    .then((data)=>{
  console.log(data)

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Admin controller Set",
    showConfirmButton: false,
    timer: 1500,
  });

    })
    .catch((error)=>{
      console.log(error)
    })
  }
  

  //checkbox selection end

  return (
    <div className="col-md-12">

      <div className="card card-outline card-info">
        <div className='borders'>
          <ul className="nav nav-tabs">

            <li className="nav-item">
              <span className="ml-3 badge bg-primary">112 </span> <span className="ml-3 badge bg-warning">00:59 </span>
              <Link className="nav-link " to="/ShowCurrentBet"> triple Chance </Link>
            </li>
         {/*   <li className="nav-item">
              <span className="ml-3 badge bg-primary">112 </span> <span className="ml-3 badge bg-warning">00:59 </span>
              <Link className="nav-link " to="/AndarbaharGame"> AndarbaharGame </Link>
            </li>
 */}
            <li className="nav-item ml-3">
              <span className="badge bg-primary">112 </span> <span className="ml-3 badge bg-warning">00:59 </span>
              <Link className="nav-link" to="/JeetoJokerGame" >  Roullet </Link>
            </li>
           {/*  <li className="nav-item ml-3">
              <span className="badge bg-primary">112 </span> <span className=" ml-2 badge bg-warning">00:59 </span>
              <Link className="nav-link " to="/16CardsGame">  sevenup</Link>
            </li>
            */} <li className="nav-item ml-3">
              <span className="badge bg-primary">112 </span> <span className="ml-3 badge bg-warning">00:59 </span>
              <Link className="nav-link " to="/SpinWinGame" >funtargetGame </Link>
            </li>
          </ul>

        </div>


        <div className="card-body">
          <div className="row">
            {/* First GAme */}
            <div className="col-md-3">
              <div className="card card-outline card-warning">
                <div className="d-flex">
                  <div className="p-2">
                    <h3 className="card-title">SevenUpDownGame</h3>

                    <br/>
                      <hr/>
                      <table>
                        <tr>
                          <th style={{marginRight:"50px"}}>DiceT1  &nbsp;&nbsp;</th>
                          <th style={{marginRight:"20px"}}>DiceT2  &nbsp;&nbsp;</th>
                        </tr>
                        <tbody>
                          <tr>
                      
                            <td style={{marginRight:"20px"}}>
                            {value1==-1?"none":value1}
                            </td>
                            <td style={{marginRight:"20px"}}>
                            {value2==-1?"none":value2}
                            </td>
                            
                          </tr>
                        </tbody>
                      </table>



                  </div>
                </div>

                <form className="shadow-sm p-3">
                  <div className="row">
                    <div className="col-md-4">
                      <button className="btn btn-primary mr-2" style={{ marginBottom: '10px' }} onClick={handleClearButtonClick}>
                        Clear
                      </button>
                    </div>
                    <div className="col-md-4">
                      <button className="btn btn-success" style={{ marginBottom: '10px' }}onClick={handleSaveButtonClick}>Save</button>
                    </div>
                  </div>
                  <div className="row" >
                    <div className="col-md-4" style={{ marginLeft: '10px' }}>Dice1</div>
                    <div className="col-md-4" style={{ marginRight: '10px' }} >Dice2</div>
                  </div>

                  <div className="row">
                    <div className="col-md-4" style={{ marginLeft: '10px' }}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="sevenUpDown"
                          id="sevenUpDown1"
                          value="1"
                          checked={dice1SelectedCheckbox.includes("1")}
                          onChange={() => handleDice1CheckboxChange("1")}
                        />
                        <label className="form-check-label" htmlFor="sevenUpDown1">
                          1
                        </label>
                      </div>
                      <div className="form-check pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="sevenUpDown"
                          id="sevenUpDown2"
                          value="2"
                          checked={dice1SelectedCheckbox.includes("2")}
                          onChange={() => handleDice1CheckboxChange("2")}
                        />
                        <label className="form-check-label" htmlFor="sevenUpDown2">
                          2
                        </label>
                      </div>


                      <div className="form-check pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="sevenUpDown"
                          id="sevenUpDown3"
                          value="3"
                          checked={dice1SelectedCheckbox.includes("3")}
                          onChange={() => handleDice1CheckboxChange("3")}
                        />
                        <label className="form-check-label" htmlFor="sevenUpDown3">
                          3
                        </label>
                      </div>

                      <div className="form-check pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="sevenUpDown"
                          id="sevenUpDown4"
                          value="4"
                          checked={dice1SelectedCheckbox.includes("4")}
                          onChange={() => handleDice1CheckboxChange("4")}
                        />
                        <label className="form-check-label" htmlFor="sevenUpDown4">
                          4
                        </label>
                      </div>


                      <div className="form-check pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="sevenUpDown"
                          id="sevenUpDown5"
                          value="5"
                          checked={dice1SelectedCheckbox.includes("5")}
                          onChange={() => handleDice1CheckboxChange("5")}
                        />
                        <label className="form-check-label" htmlFor="sevenUpDown5">
                          5
                        </label>
                      </div>


                      <div className="form-check pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="sevenUpDown"
                          id="sevenUpDown6"
                          value="6"
                          checked={dice1SelectedCheckbox.includes("6")}
                          onChange={() => handleDice1CheckboxChange("6")}
                        />
                        <label className="form-check-label" htmlFor="sevenUpDown6">
                          6
                        </label>
                      </div>
                    </div>



                    <div className="col-md-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="sevenUpDown"
                          id="sevenUpDown6"
                          value="1"
                          checked={dice2SelectedCheckbox.includes("1")}
                          onChange={() => handleDice2CheckboxChange("1")}
                        />
                        <label className="form-check-label" htmlFor="sevenUpDown6">
                          1
                        </label>
                      </div>

                      <div className="form-check pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="sevenUpDown"
                          id="sevenUpDown7"
                          value="2"
                          checked={dice2SelectedCheckbox.includes("2")}
                          onChange={() => handleDice2CheckboxChange("2")}
                        />
                        <label className="form-check-label" htmlFor="sevenUpDown7">
                          2
                        </label>
                      </div>

                      <div className="form-check pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="sevenUpDown"
                          id="sevenUpDown8"
                          value="3"
                          checked={dice2SelectedCheckbox.includes("3")}
                          onChange={() => handleDice2CheckboxChange("3")}
                        />
                        <label className="form-check-label" htmlFor="sevenUpDown8">
                          3
                        </label>
                      </div>
                      <div className="form-check pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="sevenUpDown"
                          id="sevenUpDown9"
                          value="4"
                          checked={dice2SelectedCheckbox.includes("4")}
                          onChange={() => handleDice2CheckboxChange("4")}
                        />
                        <label className="form-check-label" htmlFor="sevenUpDown9">
                          4
                        </label>
                      </div>
                      <div className="form-check pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="sevenUpDown"
                          id="sevenUpDown10"
                          value="5"
                          checked={dice2SelectedCheckbox.includes("5")}
                          onChange={() => handleDice2CheckboxChange("5")}
                        />
                        <label className="form-check-label" htmlFor="sevenUpDown10">
                          5
                        </label>
                      </div>



                      <div className="form-check pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="sevenUpDown"
                          id="sevenUpDown11"
                          value="6"
                          checked={dice2SelectedCheckbox.includes("6")}
                          onChange={() => handleDice2CheckboxChange("6")}
                        />
                        <label className="form-check-label" htmlFor="sevenUpDown11">
                          6
                        </label>
                      </div>

















                    </div>



                  </div>
                </form>
              </div>
            </div>
            {/* First End */}

            <div className="col-md-9">

              <MaterialTable
                title="Current Betting User List"
                data={data}
                columns={columns}
              />
            </div>

          </div>
        </div>
      </div>
    </div>

  );
}
export default CardsGame;
