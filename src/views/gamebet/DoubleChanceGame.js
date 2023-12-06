import React, { useState, useEffect } from "react";
import "../../style/Contact.css";
import axios from "axios";
import { apiBaseURL } from "../../config";
import MaterialTable from 'material-table'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { error } from "jquery";
import Swal from "sweetalert2";


// import { authToken } from "../../../authToken";
function DoubleChanceGame() {

  const [data, setData] = useState([])
  const [value1, setvalue1] = useState("")
  const [min, setmin] = useState(0)
  const [max, setmax] = useState(0)
  const [minname, setminname] = useState("")
  const [maxname, setmaxname] = useState("")


  const columns = [
   // { title: "Serial No", render: rowData => rowData.tableData.id + 1 },
      //   { title: "ID", field: "id" },

    //{ title: "RoundCount", field: "RoundCount" },
            
          //  { title: "winX",field:"WinX" },


           // { title: "WinNo", field: "winNo" },
           { title: "BetOn0",field:"BetOnZero" },

            { title: "BetOn1",field:"BetOnOne" },
            { title: "BetOn2",field:"BetOnTwo" },
            { title: "BetOn3",field:"BetOnThree" },
            { title: "BetOn4",field:"BetOnFour" },
            { title: "BetOn5",field:"BetOnFive" },
            { title: "BetOn6",field:"BetOnSix" },
            { title: "BetOn7",field:"BetOnSeven" },
            { title: "BetOn8",field:"BetOnEight" },
            { title: "BetOn9",field:"BetOnNine" },


            
          //  { title: "Date & Time", render: rowData => moment(rowData.playedTime).format("DD-MM-YYYY h:mm:ss ") }, 
           
  ]

  useEffect(() => {
    axios
     // .get(`${apiBaseURL}/user/FunTargetGamePlayHistory`)
     .get(`${apiBaseURL}/user/gamerunningfuntarget`)

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
      .get(`${apiBaseURL}/user/gamerunningfuntarget`)


      .then(function (response) {
        if (response.data.status === 200) {
          console.log(response.data, "data");
          const result = response.data.data.filter((item) => {
            return item.email != "admin@admin.com"

          })
          setData(result);
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
      .get(`${apiBaseURL}/user/getAdminfuntarget`)

      .then(function (response) {
        if (response.data.status === 200) {
          console.log(response.data, "data");
          setvalue1(response.data.data.value1)
          
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
 


  //checkbox start
  const [resultSelectedCheckbox, setResultSelectedCheckbox] = useState("");

  const handleResultCheckboxChange = (value) => {
    if (resultSelectedCheckbox === value) {
      setResultSelectedCheckbox("");
    } else {
      setResultSelectedCheckbox(value);
    }
  };



  //checkbox end

  //clear button
const handleClearButtonClick = (event) => {
  event.preventDefault();
  setResultSelectedCheckbox("");
  setvalue1(-1)
  axios.post("http://13.48.18.24:5000/user/Adminfuntarget",{value1:-1})

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
const handleSaveButtonClick=(event)=>{
  event.preventDefault();
  setvalue1(resultSelectedCheckbox)

  axios.post("http://13.48.18.24:5000/user/Adminfuntarget",{value:resultSelectedCheckbox})

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

// clear button end 





  return (
    <div className="col-md-12">

      <div className="card card-outline card-info">
        <div className='borders'>
          <ul className="nav nav-tabs">

            <li className="nav-item">
              <span className="ml-3 badge bg-primary">112 </span> <span className="ml-3 badge bg-warning">00:59 </span>
              <Link className="nav-link " to="/ShowCurrentBet"> triple Chance </Link>
            </li>
            {/* <li className="nav-item">
              <span className="ml-3 badge bg-primary">112 </span> <span className="ml-3 badge bg-warning">00:59 </span>
              <Link className="nav-link " to="/AndarbaharGame"> AndarbaharGame </Link>
            </li>
 */}
            <li className="nav-item ml-3">
              <span className="badge bg-primary">112 </span> <span className="ml-3 badge bg-warning">00:59 </span>
              <Link className="nav-link" to="/JeetoJokerGame" >  Roullet </Link>
            </li>
            {/* <li className="nav-item ml-3">
              <span className="badge bg-primary">112 </span> <span className=" ml-2 badge bg-warning">00:59 </span>
              <Link className="nav-link " to="/16CardsGame">  sevenup</Link>
            </li>
             */}<li className="nav-item ml-3">
              <span className="badge bg-primary">112 </span> <span className="ml-3 badge bg-warning">00:59 </span>
              <Link className="nav-link " to="/SpinWinGame" >funtargetGame </Link>
            </li>
          </ul>

        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <div className="card card-outline card-warning">
                <div className="d-flex">
                  <div className="p-2" >
                    <h3 className="card-title"  >FunTarget Game</h3>
<br/>
<hr/>
<table>
                        <tr>
                          <th style={{marginRight:"50px"}}>Result &nbsp;&nbsp;</th>
                        
                        </tr>
                        <tbody>
                          <tr>
                      
                            <td style={{marginRight:"20px"}}>
                            {value1==-1?"none":value1}
                            </td>
                           
                          </tr>
                        </tbody>
                      </table>
                  



                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <button className="btn btn-primary mr-2" style={{marginLeft: '30px', marginBottom: '10px' }} onClick={handleClearButtonClick} >
                      Clear
                    </button>
                  </div>
                  <div className="col-md-4">
                    <button className="btn btn-success" style={{ marginBottom: '20px', marginLeft: '60px' }} onClick={handleSaveButtonClick} >Save</button >
                  </div>
                </div>

                <form className="shadow-sm p-3">
                <div className="row"  style={{ marginBottom: '20px' }}>
                <div className="col-md-4">
  <strong style={{ fontWeight: 'bolder' }}>Result</strong>
</div>

</div>




                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="Funtarget"
                      id="Funtarget1"
                      value="0"
                      checked={resultSelectedCheckbox === "0"}
                      onChange={() => handleResultCheckboxChange("0")}
                    />
                    <label className="form-check-label" htmlFor="Funtarget1">
                      0
                    </label>
                  </div>


                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="Funtarget"
                      id="Funtarget2"
                      value="1"
                      checked={resultSelectedCheckbox === "1"}
                      onChange={() => handleResultCheckboxChange("1")}
                    />
                    <label className="form-check-label" htmlFor="Funtarget2">
                      1
                    </label>
                  </div>


                  <div className="form-check pt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="Funtarget"
                      id="Funtarget3"
                      value="2"
                      checked={resultSelectedCheckbox === "2"}
                      onChange={() => handleResultCheckboxChange("2")}
                    />
                    <label className="form-check-label" htmlFor="Funtarget3">
                      2
                    </label>
                  </div>

                  <div className="form-check pt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="Funtarget"
                      id="Funtarget4"
                      value="3"
                      checked={resultSelectedCheckbox === "3"}
                      onChange={() => handleResultCheckboxChange("3")}
                    />
                    <label className="form-check-label" htmlFor="Funtarget4">
                      3
                    </label>
                  </div>


                  <div className="form-check pt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="Funtarget"
                      id="Funtarget5"
                      value="4"
                      checked={resultSelectedCheckbox === "4"}
                      onChange={() => handleResultCheckboxChange("4")}
                    />
                    <label className="form-check-label" htmlFor="Funtarget5">
                      4
                    </label>
                  </div>


                  <div className="form-check pt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="Funtarget"
                      id="Funtarget6"
                      value="5"
                      checked={resultSelectedCheckbox === "5"}
                      onChange={() => handleResultCheckboxChange("5")}
                    />
                    <label className="form-check-label" htmlFor="Funtarget6">
                      5
                    </label>
                  </div>

                  <div className="form-check pt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="Funtarget"
                      id="Funtarget7"
                      value="6"
                      checked={resultSelectedCheckbox === "6"}
                      onChange={() => handleResultCheckboxChange("6")}
                    />
                    <label className="form-check-label" htmlFor="Funtarget7">
                      6
                    </label>
                  </div>


                  <div className="form-check pt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="Funtarget"
                      id="Funtarget8"
                      value="7"
                      checked={resultSelectedCheckbox === "7"}
                      onChange={() => handleResultCheckboxChange("7")}
                    />
                    <label className="form-check-label" htmlFor="Funtarget8">
                      7
                    </label>
                  </div>


                  <div className="form-check pt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="Funtarget"
                      id="Funtarget9"
                      value="8"
                      checked={resultSelectedCheckbox === "8"}
                      onChange={() => handleResultCheckboxChange("8")}
                    />
                    <label className="form-check-label" htmlFor="Funtarget9">
                      8
                    </label>
                  </div>

                  {/* Checkbox for value 9 */}
                  <div className="form-check pt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="Funtarget"
                      id="Funtarget10"
                      value="9"
                      checked={resultSelectedCheckbox === "9"}
                      onChange={() => handleResultCheckboxChange("9")}
                    />
                    <label className="form-check-label" htmlFor="Funtarget10">
                      9
                    </label>
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
                title="Current Bet"
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
export default DoubleChanceGame;
