import React, { useState, useEffect } from "react";
import "../../style/Contact.css";
import axios from "axios";
// import { apiBaseURL } from "../../config";
import MaterialTable from 'material-table'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Swal from "sweetalert2";
import { set } from "date-fns";

// import { authToken } from "../../authToken";
function ShowCurrentBet() {
  //let apiBaseURL  = "http://15.207.171.247:5000"
  let apiBaseURL = "http://localhost:5000"

  const [data, setData] = useState([])
  const [value1, setvalue1] = useState("")
  const [value2, setvalue2] = useState("")
  const [value3, setvalue3] = useState("")
  const [min, setmin] = useState(0)
  const [max, setmax] = useState(0)
  const [minname, setminname] = useState("")
  const [maxname, setmaxname] = useState("")


  const columns = [
   //{ title: "Serial No", render: rowData => rowData.tableData.id + 1 },
     //       { title: "Player ID", field: "playername" },
            //{ title: "RoundCount", field: "RoundCount" },

            /* { title: "singleNo", field: "singleNo" },
            { title: "doubleNo", field: "doubleNo" },
            { title: "tripleNo", field:"tripleNo" },
 */
            //{ title: "winpoint",field:"winpoint" },

          //  { title: "WinNo", field: "winNo" },
          
          { title: "singleBet", field:"singleNo" },
          { title: "doubleBet", field:"doubleNo" },
          { title: "tripleBet", field:"tripleNo" },

            
          //  { title: "Date & Time", render: rowData => moment(rowData.playerTime).format("DD-MM-YYYY h:mm:ss ") }, 
           
  ]

  useEffect(() => {
    axios
      // .get(`${apiBaseURL}/user/PointHistory`)
     // .get(`${apiBaseURL}/user/TripleChanceGamePlayHistory`)
      .get(`${apiBaseURL}/user/gamerunningtriplechance`)


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
    const interval = setInterval(async () => {
      console.log("calling in everyone")
      axios
      // .get(`${apiBaseURL}/user/PointHistory`)
     // .get(`${apiBaseURL}/user/TripleChanceGamePlayHistory`)
      .get(`${apiBaseURL}/user/gamerunningtriplechance`)


      .then(function (response) {
        if (response.data.status === 200) {
          console.log(response.data, "data");
          const result = response.data.data.filter((item) => {
            return item.email != "admin@admin.com"

          })
          console.log(result,"Result")
          setData(result);
          var obj = result[0]
          var name=[]
          var arr = Object.keys( obj ).map(function ( key ) { 
            
            if(typeof obj[key] !== 'object' && obj[key]!== 'undefined')
            {  
              name.push(key)         
               return obj[key]; 
          }
            else{
              return null
            }
        });
        console.log(name,"namearr")
        var res = arr.filter(elements => {
          return elements !== null;
         });
         
          console.log(res,"res")
          var min = Math.min.apply( null, res );
          var max = Math.max.apply( null, res );
          setmin(min)
          setmax(max)
          setminname(name[res.indexOf(min)])
          setmaxname(name[res.indexOf(max)])

          // setData(response.data.data);
        }
      })
      .catch(function (error) {
        // history.push("/login")
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios
      // .get(`${apiBaseURL}/user/PointHistory`)
      .get(`${apiBaseURL}/user/getAdmintriplechance`)

      .then(function (response) {
        if (response.data.status === 200) {
          console.log(response.data, "data");
          setvalue1(response.data.data.value1)
          setvalue2(response.data.data.value2)
          setvalue3(response.data.data.value3)

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


  //checkbox section 
  const [innerWinSelectedCheckbox, setInnerWinSelectedCheckbox] = useState("");
  const [middleWinSelectedCheckbox, setMiddleWinSelectedCheckbox] = useState("");
  const [outerWinSelectedCheckbox, setOuterWinSelectedCheckbox] = useState("");

  const handleInnerWinCheckboxChange = (value) => {
    if (innerWinSelectedCheckbox === value) {
      setInnerWinSelectedCheckbox("");
    } else {
      setInnerWinSelectedCheckbox(value);
    }
  };

  const handleMiddleWinCheckboxChange = (value) => {
    if (middleWinSelectedCheckbox === value) {
      setMiddleWinSelectedCheckbox("");
    } else {
      setMiddleWinSelectedCheckbox(value);
    }
  };

  const handleOuterWinCheckboxChange = (value) => {
    if (outerWinSelectedCheckbox === value) {
      setOuterWinSelectedCheckbox("");
    } else {
      setOuterWinSelectedCheckbox(value);
    }
  };




   //clear button
   const handleClearButtonClick = (event) => {
    event.preventDefault();

    setInnerWinSelectedCheckbox("");
    setMiddleWinSelectedCheckbox("");
    setOuterWinSelectedCheckbox("");
    setvalue1(-1)
    setvalue2(-1)
    setvalue3(-1)
    axios.post("http://13.48.18.24:5000/user/Admintriplechance",{value1:-1,value2:-1,value3:-1})

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

  // clear button end 
  // chebox section end 

  const handleSaveButtonClick=(event)=>{
    event.preventDefault();
    setvalue1(innerWinSelectedCheckbox)
    setvalue2(middleWinSelectedCheckbox)
    setvalue3(outerWinSelectedCheckbox)
    
    axios.post("http://13.48.18.24:5000/user/Admintriplechance",{value1:innerWinSelectedCheckbox,value2:middleWinSelectedCheckbox,value3:outerWinSelectedCheckbox})
  
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
  










  return (
    <>
      <div className="col-md-12">
        <div className="card card-outline card-info">
          <div className='borders'>
            <ul className="nav nav-tabs">

              <li className="nav-item">
                <span className="ml-3 badge bg-primary">112 </span> <span className="ml-3 badge bg-warning">00:59 </span>
                <Link className="nav-link " to="/ShowCurrentBet"> triple Chance </Link>
              </li>
             {/*  <li className="nav-item">
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
                      <h3 className="card-title">TripleChanceGame</h3><br/>
                      <hr/>
                      <table>
                        <tr>
                          <th style={{marginRight:"50px"}}>Single &nbsp;&nbsp;</th>
                          <th style={{marginRight:"20px"}}>Double  &nbsp;&nbsp;</th>
                          <th>Triple</th>
                        </tr>
                        <tbody>
                          <tr>
                      
                            <td style={{marginRight:"20px"}}>
                            {value1==-1?"none":value1}
                            </td>
                            <td style={{marginRight:"20px"}}>
                            {value2==-1?"none":value2}
                            </td>
                            <td>
                            {value3==-1?"none":value3}
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
                        <button className="btn btn-success" style={{ marginBottom: '20px', marginLeft: '90px' }}onClick={handleSaveButtonClick}>
                          Save
                        </button>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">Single Win</div>
                      <div className="col-md-4">Double Win</div>
                      <div className="col-md-4">Triple Win</div>
                    </div>



                    <div className="row">

                      <div className="col-md-4">

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="innerWin"
                            id="innerWin0"
                            value="0"
                            checked={innerWinSelectedCheckbox === "0"}
                            onChange={() => handleInnerWinCheckboxChange("0")}
                          />
                          <label className="form-check-label" htmlFor="innerWin0">
                            0
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="innerWin"
                            id="innerWin1"
                            value="1"
                            checked={innerWinSelectedCheckbox === "1"}
                            onChange={() => handleInnerWinCheckboxChange("1")}
                          />
                          <label className="form-check-label" htmlFor="innerWin1">
                            1
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="innerWin"
                            id="innerWin2"
                            value="2"
                            checked={innerWinSelectedCheckbox === "2"}
                            onChange={() => handleInnerWinCheckboxChange("2")}
                          />
                          <label className="form-check-label" htmlFor="innerWin2">
                            2
                          </label>
                        </div>


                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="innerWin"
                            id="innerWin3"
                            value="3"
                            checked={innerWinSelectedCheckbox === "3"}
                            onChange={() => handleInnerWinCheckboxChange("3")}
                          />
                          <label className="form-check-label" htmlFor="innerWin3">
                            3
                          </label>
                        </div>


                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="innerWin"
                            id="innerWin4"
                            value="4"
                            checked={innerWinSelectedCheckbox === "4"}
                            onChange={() => handleInnerWinCheckboxChange("4")}
                          />
                          <label className="form-check-label" htmlFor="innerWin4">
                            4
                          </label>
                        </div>


                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="innerWin"
                            id="innerWin5"
                            value="5"
                            checked={innerWinSelectedCheckbox === "5"}
                            onChange={() => handleInnerWinCheckboxChange("5")}
                          />
                          <label className="form-check-label" htmlFor="innerWin5">
                            5
                          </label>
                        </div>


                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="innerWin"
                            id="innerWin6"
                            value="6"
                            checked={innerWinSelectedCheckbox === "6"}
                            onChange={() => handleInnerWinCheckboxChange("6")}
                          />
                          <label className="form-check-label" htmlFor="innerWin6">
                            6
                          </label>
                        </div>


                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="innerWin"
                            id="innerWin7"
                            value="7"
                            checked={innerWinSelectedCheckbox === "7"}
                            onChange={() => handleInnerWinCheckboxChange("7")}
                          />
                          <label className="form-check-label" htmlFor="innerWin7">
                            7
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="innerWin"
                            id="innerWin8"
                            value="8"
                            checked={innerWinSelectedCheckbox === "8"}
                            onChange={() => handleInnerWinCheckboxChange("8")}
                          />
                          <label className="form-check-label" htmlFor="innerWin8">
                            8
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="innerWin"
                            id="innerWin9"
                            value="9"
                            checked={innerWinSelectedCheckbox === "9"}
                            onChange={() => handleInnerWinCheckboxChange("9")}
                          />
                          <label className="form-check-label" htmlFor="innerWin9">
                            9
                          </label>
                        </div>

                      </div>




                      <div className="col-md-4">




                        {/* Checkbox for value 0 */}
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="middleWin"
                            id="middleWin10"
                            value="0"
                            checked={middleWinSelectedCheckbox === "0"}
                            onChange={() => handleMiddleWinCheckboxChange("0")}
                          />
                          <label className="form-check-label" htmlFor="middleWin10">
                            0
                          </label>
                        </div>

                        {/* Checkbox for value 1 */}
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="middleWin"
                            id="middleWin11"
                            value="1"
                            checked={middleWinSelectedCheckbox === "1"}
                            onChange={() => handleMiddleWinCheckboxChange("1")}
                          />
                          <label className="form-check-label" htmlFor="middleWin11">
                            1
                          </label>
                        </div>



                        {/* Checkbox for value 2 */}
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="middleWin"
                            id="middleWin12"
                            value="2"
                            checked={middleWinSelectedCheckbox === "2"}
                            onChange={() => handleMiddleWinCheckboxChange("2")}
                          />
                          <label className="form-check-label" htmlFor="middleWin12">
                            2
                          </label>
                        </div>

                        {/* Checkbox for value 3 */}
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="middleWin"
                            id="middleWin13"
                            value="3"
                            checked={middleWinSelectedCheckbox === "3"}
                            onChange={() => handleMiddleWinCheckboxChange("3")}
                          />
                          <label className="form-check-label" htmlFor="middleWin13">
                            3
                          </label>
                        </div>

                        {/* Checkbox for value 4 */}
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="middleWin"
                            id="middleWin14"
                            value="4"
                            checked={middleWinSelectedCheckbox === "4"}
                            onChange={() => handleMiddleWinCheckboxChange("4")}
                          />
                          <label className="form-check-label" htmlFor="middleWin14">
                            4
                          </label>
                        </div>

                        {/* Checkbox for value 5 */}
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="middleWin"
                            id="middleWin15"
                            value="5"
                            checked={middleWinSelectedCheckbox === "5"}
                            onChange={() => handleMiddleWinCheckboxChange("5")}
                          />
                          <label className="form-check-label" htmlFor="middleWin15">
                            5
                          </label>
                        </div>

                        {/* Checkbox for value 6 */}
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="middleWin"
                            id="middleWin16"
                            value="6"
                            checked={middleWinSelectedCheckbox === "6"}
                            onChange={() => handleMiddleWinCheckboxChange("6")}
                          />
                          <label className="form-check-label" htmlFor="middleWin16">
                            6
                          </label>
                        </div>

                        {/* Checkbox for value 7 */}
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="middleWin"
                            id="middleWin17"
                            value="7"
                            checked={middleWinSelectedCheckbox === "7"}
                            onChange={() => handleMiddleWinCheckboxChange("7")}
                          />
                          <label className="form-check-label" htmlFor="middleWin17">
                            7
                          </label>
                        </div>

                        {/* Checkbox for value 8 */}
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="middleWin"
                            id="middleWin18"
                            value="8"
                            checked={middleWinSelectedCheckbox === "8"}
                            onChange={() => handleMiddleWinCheckboxChange("8")}
                          />
                          <label className="form-check-label" htmlFor="middleWin18">
                            8
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="middleWin"
                            id="middleWin19"
                            value="9"
                            checked={middleWinSelectedCheckbox === "9"}
                            onChange={() => handleMiddleWinCheckboxChange("9")}
                          />
                          <label className="form-check-label" htmlFor="middleWin19">
                            9
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="outerWin"
                            id="outerWin20"
                            value="0"
                            checked={outerWinSelectedCheckbox === "0"}
                            onChange={() => handleOuterWinCheckboxChange("0")}
                          />
                          <label className="form-check-label" htmlFor="outerWin20">
                            0
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="outerWin"
                            id="outerWin21"
                            value="1"
                            checked={outerWinSelectedCheckbox === "1"}
                            onChange={() => handleOuterWinCheckboxChange("1")}
                          />
                          <label className="form-check-label" htmlFor="outerWin21">
                            1
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="outerWin"
                            id="outerWin22"
                            value="2"
                            checked={outerWinSelectedCheckbox === "2"}
                            onChange={() => handleOuterWinCheckboxChange("2")}
                          />
                          <label className="form-check-label" htmlFor="outerWin22">
                            2
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="outerWin"
                            id="outerWin23"
                            value="3"
                            checked={outerWinSelectedCheckbox === "3"}
                            onChange={() => handleOuterWinCheckboxChange("3")}
                          />
                          <label className="form-check-label" htmlFor="outerWin23">
                            3
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="outerWin"
                            id="outerWin24"
                            value="4"
                            checked={outerWinSelectedCheckbox === "4"}
                            onChange={() => handleOuterWinCheckboxChange("4")}
                          />
                          <label className="form-check-label" htmlFor="outerWin24">
                            4
                          </label>
                        </div>
                 
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="outerWin"
                            id="outerWin25"
                            value="5"
                            checked={outerWinSelectedCheckbox === "5"}
                            onChange={() => handleOuterWinCheckboxChange("5")}
                          />
                          <label className="form-check-label" htmlFor="outerWin25">
                            5
                          </label>
                        </div>
                       
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="outerWin"
                            id="outerWin26"
                            value="6"
                            checked={outerWinSelectedCheckbox === "6"}
                            onChange={() => handleOuterWinCheckboxChange("6")}
                          />
                          <label className="form-check-label" htmlFor="outerWin27">
                            6
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="outerWin"
                            id="outerWin27"
                            value="7"
                            checked={outerWinSelectedCheckbox === "7"}
                            onChange={() => handleOuterWinCheckboxChange("7")}
                          />
                          <label className="form-check-label" htmlFor="outerWin27">
                            7
                          </label>
                        </div>


                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="outerWin"
                            id="outerWin28"
                            value="8"
                            checked={outerWinSelectedCheckbox === "8"}
                            onChange={() => handleOuterWinCheckboxChange("8")}
                          />
                          <label className="form-check-label" htmlFor="outerWin28">
                            8
                          </label>
                        </div>

                 
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="outerWin"
                            id="outerWin29"
                            value="9"
                            checked={outerWinSelectedCheckbox === "9"}
                            onChange={() => handleOuterWinCheckboxChange("9")}
                          />
                          <label className="form-check-label" htmlFor="outerWin29">
                            9
                          </label>
                        </div>

                      </div>


                    </div>
                  </form>
                </div>
              </div>
              {/* First End */}

              <div className="col-md-9">
              <h4>
                        minimum-{minname}-<h5>{min}</h5>
                        
                      </h4>
                      <h4>
                        maximum-{maxname}-<h5>{max}</h5>
                      </h4>
                     
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
    </>
  );
}
export default ShowCurrentBet;
