import React, { useState, useEffect } from "react";
import "../../style/Contact.css";
import axios from "axios";
import { apiBaseURL } from "../../config";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";

// import { authToken } from "../../../authToken";
function JeetoJokerGame() {
  const [data, setData] = useState([]);
  const [dat, setDat] = useState([]);
  const [value1, setvalue1] = useState("");
  const [min, setmin] = useState(0);
  const [max, setmax] = useState(0);
  const [minname, setminname] = useState("");
  const [maxname, setmaxname] = useState("");

  //localhost
  const gameReports = async () => {
    await axios
      .get(`${apiBaseURL}/user/getAdminroulette`)
      .then(function (response) {
        if (response.data.status === 200) {
          setData(response.data.data);
        }
      })
      .catch(function (error) {});
  };

  const columns = [
    //{ title: "Serial No", render: rowData => rowData.tableData.id + 1 },
    // { title: "Player ID", field: "playername" },
    //   { title: "RoundCount", field: "RoundCount" },

    /*  {title:"straightUpVal" ,field: "straightUpVal"},
            {title:"SplitVal" ,field: "SplitVal"},
            {title:"StreetVal" ,field: "StreetVal "},
            {title:"CornerVal" ,field: "CornerVal "},
            {title:"specificBetVal" ,field: "specificBetVal "},
            {title:"lineVal" ,field: "lineVal "},
            {title:"dozen1Val" ,field: "dozen1Val "},
            {title:"dozen2Val" ,field: "dozen2Val "},
            {title:"dozen3Val" ,field: "dozen3Val "},
            {title:"column1Val" ,field: "column1Val "},
            {title:"column2Val" ,field: "column2Val "},
            {title:"column3Val" ,field: "column3Val "},
            {title:"onetoEighteenVal" ,field: "onetoEighteenVal "},
            {title:"nineteentoThirtysixVal" ,field: "nineteentoThirtysixVal "},
            {title:"evenVal" ,field: "evenVal "},
            {title:"oddVal" ,field: "oddVal "},
            {title:"blackVal" ,field: "blackVal "},
            {title:"redVal" ,field: "redVal"},
           */

    { title: "BetOn00", field: "bet00" },

    { title: "BetOn0", field: "bet0" },

    { title: "BetOn1", field: "bet1" },
    { title: "BetOn2", field: "bet2" },
    { title: "BetOn3", field: "bet3" },
    { title: "BetOn4", field: "bet4" },
    { title: "BetOn5", field: "bet5" },
    { title: "BetOn6", field: "bet6" },
    { title: "BetOn7", field: "bet7" },
    { title: "BetOn8", field: "bet8" },
    { title: "BetOn9", field: "bet9" },
    { title: "BetOn10", field: "bet10" },
    { title: "BetOn11", field: "bet11" },
    { title: "BetOn12", field: "bet12" },
    { title: "BetOn13", field: "bet13" },
    { title: "BetOn14", field: "bet14" },
    { title: "BetOn15", field: "bet15" },
    { title: "BetOn16", field: "bet16" },

    { title: "BetOn17", field: "bet17" },
    { title: "BetOn18", field: "bet18" },
    { title: "BetOn19", field: "bet19" },
    { title: "BetOn20", field: "bet20" },
    { title: "BetOn21", field: "bet21" },
    { title: "BetOn22", field: "bet22" },
    { title: "BetOn23", field: "bet23" },
    { title: "BetOn24", field: "bet24" },
    { title: "BetOn25", field: "bet25" },
    { title: "BetOn26", field: "bet26" },
    { title: "BetOn27", field: "bet27" },
    { title: "BetOn28", field: "bet28" },
    { title: "BetOn29", field: "bet29" },
    { title: "BetOn30", field: "bet30" },
    { title: "BetOn31", field: "bet31" },
    { title: "BetOn32", field: "bet32" },
    { title: "BetOn33", field: "bet33" },
    { title: "BetOn34", field: "bet34" },
    { title: "BetOn35", field: "bet35" },
    { title: "BetOn36", field: "bet36" },

    //  { title: "WinNo", field: "winNo" },

    //{ title: "Date & Time", render: rowData => moment(rowData.playedTime).format("DD-MM-YYYY h:mm:ss ") },
  ];

  useEffect(() => {
    axios
      //.get(`${apiBaseURL}/user/RoulletGamePlayHistory`)
      .get(`${apiBaseURL}/user/gamerunningroulette`)

      .then(function (response) {
        if (response.data.status === 200) {
          console.log(response.data, "data");
          const result = response.data.data.filter((item) => {
            return item.email != "admin@admin.com";
          });
          setData(result);
          console.log(result, "Result");
          setData(result);
          var obj = result[0];
          var name = [];
          var arr = Object.keys(obj).map(function (key) {
            if (typeof obj[key] !== "object" && obj[key] !== "undefined") {
              name.push(key);
              return obj[key];
            } else {
              return null;
            }
          });
          console.log(name, "namearr");
          var res = arr.filter((elements) => {
            return elements !== null;
          });

          console.log(res, "res");
          var min = Math.min.apply(null, res);
          var max = Math.max.apply(null, res);
          setmin(min);
          setmax(max);
          setminname(name[res.indexOf(min)]);
          setmaxname(name[res.indexOf(max)]);

          // setData(response.data.data);
        }
      })
      .catch(function (error) {
        // history.push("/login")
      });
    gameReports();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      console.log("calling in everyone");
      axios
        // .get(`${apiBaseURL}/user/PointHistory`)
        // .get(`${apiBaseURL}/user/TripleChanceGamePlayHistory`)
        .get(`${apiBaseURL}/user/gamerunningroulette`)

        .then(function (response) {
          if (response.data.status === 200) {
            console.log(response.data, "data");
            const result = response.data.data.filter((item) => {
              return item.email != "admin@admin.com";
            });
            setData(result);

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
      .get(`${apiBaseURL}/user/getAdminroulette`)

      .then(function (response) {
        if (response.data.status === 200) {
          console.log(response.data, "data");
          setvalue1(response.data.data.value1);

          // setData(response.data.data);
        }
      })
      .catch(function (error) {
        // history.push("/login")
      });
  }, []);

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
    setvalue1(-1);
    axios
      .post("http://13.48.18.24:5000/user/Adminroulette", { value1: -1 })

      .then((data) => {
        console.log(data);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Admin controller Reset",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //save button
  const handleSaveButtonClick = (event) => {
    event.preventDefault();
    setvalue1(resultSelectedCheckbox);
    axios
      .post("http://13.48.18.24:5000/user/Adminroulette", {
        value1: resultSelectedCheckbox,
      })

      .then((data) => {
        console.log(data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Admin controller Set",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // clear button end
  return (
    <div className="col-md-12">
      <div className="card card-outline card-info">
        <div className="borders">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <span className="ml-3 badge bg-primary">112 </span>{" "}
              <span className="ml-3 badge bg-warning">00:59 </span>
              <Link className="nav-link " to="/ShowCurrentBet">
                {" "}
                triple Chance{" "}
              </Link>
            </li>
            {/*  <li className="nav-item">
              <span className="ml-3 badge bg-primary">112 </span> <span className="ml-3 badge bg-warning">00:59 </span>
              <Link className="nav-link " to="/AndarbaharGame"> AndarbaharGame </Link>
            </li>
 */}
            <li className="nav-item ml-3">
              <span className="badge bg-primary">112 </span>{" "}
              <span className="ml-3 badge bg-warning">00:59 </span>
              <Link className="nav-link" to="/JeetoJokerGame">
                {" "}
                Roullet{" "}
              </Link>
            </li>
            {/*  <li className="nav-item ml-3">
              <span className="badge bg-primary">112 </span> <span className=" ml-2 badge bg-warning">00:59 </span>
              <Link className="nav-link " to="/16CardsGame">  sevenup</Link>
            </li>
            */}{" "}
            <li className="nav-item ml-3">
              <span className="badge bg-primary">112 </span>{" "}
              <span className="ml-3 badge bg-warning">00:59 </span>
              <Link className="nav-link " to="/SpinWinGame">
                funtargetGame{" "}
              </Link>
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
                    <h3 className="card-title" style={{ fontWeight: "bold" }}>
                      Roullet Game
                    </h3>
                    <br />
                    <hr />
                    <table>
                      <tr>
                        <th style={{ marginRight: "50px" }}>
                          Result &nbsp;&nbsp;
                        </th>
                      </tr>
                      <tbody>
                        <tr>
                          <td style={{ marginRight: "20px" }}>
                            {value1 == -1 ? "none" : value1}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <button
                      className="btn btn-primary mr-2"
                      style={{ marginLeft: "30px", marginBottom: "10px" }}
                      onClick={handleClearButtonClick}
                    >
                      Clear
                    </button>
                  </div>
                  <div className="col-md-4">
                    <button
                      className="btn btn-success"
                      style={{ marginBottom: "20px", marginLeft: "60px" }}
                      onClick={handleSaveButtonClick}
                    >
                      Save
                    </button>
                  </div>
                </div>

                <form className="shadow-sm p-3">
                  <div className="row">
                    <strong style={{ fontWeight: "bolder" }}>RESULT</strong>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette0"
                      value="0"
                      checked={resultSelectedCheckbox === "0"}
                      onChange={() => handleResultCheckboxChange("0")}
                    />
                    <label className="form-check-label" htmlFor="roulette0">
                      0
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette00"
                      value="00"
                      checked={resultSelectedCheckbox === "00"}
                      onChange={() => handleResultCheckboxChange("00")}
                    />
                    <label className="form-check-label" htmlFor="roulette00">
                      00
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette1"
                      value="1"
                      checked={resultSelectedCheckbox === "1"}
                      onChange={() => handleResultCheckboxChange("1")}
                    />
                    <label className="form-check-label" htmlFor="roulette1">
                      1
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette2"
                      value="2"
                      checked={resultSelectedCheckbox === "2"}
                      onChange={() => handleResultCheckboxChange("2")}
                    />
                    <label className="form-check-label" htmlFor="roulette2">
                      2
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette3"
                      value="3"
                      checked={resultSelectedCheckbox === "3"}
                      onChange={() => handleResultCheckboxChange("3")}
                    />
                    <label className="form-check-label" htmlFor="roulette3">
                      3
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette4"
                      value="4"
                      checked={resultSelectedCheckbox === "4"}
                      onChange={() => handleResultCheckboxChange("4")}
                    />
                    <label className="form-check-label" htmlFor="roulette4">
                      4
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette5"
                      value="5"
                      checked={resultSelectedCheckbox === "5"}
                      onChange={() => handleResultCheckboxChange("5")}
                    />
                    <label className="form-check-label" htmlFor="roulette5">
                      5
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette6"
                      value="6"
                      checked={resultSelectedCheckbox === "6"}
                      onChange={() => handleResultCheckboxChange("6")}
                    />
                    <label className="form-check-label" htmlFor="roulette6">
                      6
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette7"
                      value="7"
                      checked={resultSelectedCheckbox === "7"}
                      onChange={() => handleResultCheckboxChange("7")}
                    />
                    <label className="form-check-label" htmlFor="roulette7">
                      7
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette8"
                      value="8"
                      checked={resultSelectedCheckbox === "8"}
                      onChange={() => handleResultCheckboxChange("8")}
                    />
                    <label className="form-check-label" htmlFor="roulette8">
                      8
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette9"
                      value="9"
                      checked={resultSelectedCheckbox === "9"}
                      onChange={() => handleResultCheckboxChange("9")}
                    />
                    <label className="form-check-label" htmlFor="roulette9">
                      9
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette10"
                      value="10"
                      checked={resultSelectedCheckbox === "10"}
                      onChange={() => handleResultCheckboxChange("10")}
                    />
                    <label className="form-check-label" htmlFor="roulette10">
                      10
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette11"
                      value="11"
                      checked={resultSelectedCheckbox === "11"}
                      onChange={() => handleResultCheckboxChange("11")}
                    />
                    <label className="form-check-label" htmlFor="roulette11">
                      11
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette12"
                      value="12"
                      checked={resultSelectedCheckbox === "12"}
                      onChange={() => handleResultCheckboxChange("12")}
                    />
                    <label className="form-check-label" htmlFor="roulette12">
                      12
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette13"
                      value="13"
                      checked={resultSelectedCheckbox === "13"}
                      onChange={() => handleResultCheckboxChange("13")}
                    />
                    <label className="form-check-label" htmlFor="roulette13">
                      13
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette14"
                      value="14"
                      checked={resultSelectedCheckbox === "14"}
                      onChange={() => handleResultCheckboxChange("14")}
                    />
                    <label className="form-check-label" htmlFor="roulette14">
                      14
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette15"
                      value="15"
                      checked={resultSelectedCheckbox === "15"}
                      onChange={() => handleResultCheckboxChange("15")}
                    />
                    <label className="form-check-label" htmlFor="roulette15">
                      15
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette16"
                      value="16"
                      checked={resultSelectedCheckbox === "16"}
                      onChange={() => handleResultCheckboxChange("16")}
                    />
                    <label className="form-check-label" htmlFor="roulette16">
                      16
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette17"
                      value="17"
                      checked={resultSelectedCheckbox === "17"}
                      onChange={() => handleResultCheckboxChange("17")}
                    />
                    <label className="form-check-label" htmlFor="roulette17">
                      17
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette18"
                      value="18"
                      checked={resultSelectedCheckbox === "18"}
                      onChange={() => handleResultCheckboxChange("18")}
                    />
                    <label className="form-check-label" htmlFor="roulette18">
                      18
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette19"
                      value="19"
                      checked={resultSelectedCheckbox === "19"}
                      onChange={() => handleResultCheckboxChange("19")}
                    />
                    <label className="form-check-label" htmlFor="roulette19">
                      19
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette20"
                      value="20"
                      checked={resultSelectedCheckbox === "20"}
                      onChange={() => handleResultCheckboxChange("20")}
                    />
                    <label className="form-check-label" htmlFor="roulette20">
                      20
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette21"
                      value="21"
                      checked={resultSelectedCheckbox === "21"}
                      onChange={() => handleResultCheckboxChange("21")}
                    />
                    <label className="form-check-label" htmlFor="roulette21">
                      21
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette22"
                      value="22"
                      checked={resultSelectedCheckbox === "22"}
                      onChange={() => handleResultCheckboxChange("22")}
                    />
                    <label className="form-check-label" htmlFor="roulette22">
                      22
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette23"
                      value="23"
                      checked={resultSelectedCheckbox === "23"}
                      onChange={() => handleResultCheckboxChange("23")}
                    />
                    <label className="form-check-label" htmlFor="roulette23">
                      23
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette24"
                      value="24"
                      checked={resultSelectedCheckbox === "24"}
                      onChange={() => handleResultCheckboxChange("24")}
                    />
                    <label className="form-check-label" htmlFor="roulette24">
                      24
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette25"
                      value="25"
                      checked={resultSelectedCheckbox === "25"}
                      onChange={() => handleResultCheckboxChange("25")}
                    />
                    <label className="form-check-label" htmlFor="roulette25">
                      25
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette26"
                      value="26"
                      checked={resultSelectedCheckbox === "26"}
                      onChange={() => handleResultCheckboxChange("26")}
                    />
                    <label className="form-check-label" htmlFor="roulette26">
                      26
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette27"
                      value="27"
                      checked={resultSelectedCheckbox === "27"}
                      onChange={() => handleResultCheckboxChange("27")}
                    />
                    <label className="form-check-label" htmlFor="roulette27">
                      27
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette28"
                      value="28"
                      checked={resultSelectedCheckbox === "28"}
                      onChange={() => handleResultCheckboxChange("28")}
                    />
                    <label className="form-check-label" htmlFor="roulette28">
                      28
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette29"
                      value="29"
                      checked={resultSelectedCheckbox === "29"}
                      onChange={() => handleResultCheckboxChange("29")}
                    />
                    <label className="form-check-label" htmlFor="roulette29">
                      29
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette30"
                      value="30"
                      checked={resultSelectedCheckbox === "30"}
                      onChange={() => handleResultCheckboxChange("30")}
                    />
                    <label className="form-check-label" htmlFor="roulette30">
                      30
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette31"
                      value="31"
                      checked={resultSelectedCheckbox === "31"}
                      onChange={() => handleResultCheckboxChange("31")}
                    />
                    <label className="form-check-label" htmlFor="roulette31">
                      31
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette32"
                      value="32"
                      checked={resultSelectedCheckbox === "32"}
                      onChange={() => handleResultCheckboxChange("32")}
                    />
                    <label className="form-check-label" htmlFor="roulette32">
                      32
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette33"
                      value="33"
                      checked={resultSelectedCheckbox === "33"}
                      onChange={() => handleResultCheckboxChange("33")}
                    />
                    <label className="form-check-label" htmlFor="roulette33">
                      33
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette34"
                      value="34"
                      checked={resultSelectedCheckbox === "34"}
                      onChange={() => handleResultCheckboxChange("34")}
                    />
                    <label className="form-check-label" htmlFor="roulette34">
                      34
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette35"
                      value="35"
                      checked={resultSelectedCheckbox === "35"}
                      onChange={() => handleResultCheckboxChange("35")}
                    />
                    <label className="form-check-label" htmlFor="roulette35">
                      35
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="roulette"
                      id="roulette35"
                      value="35"
                      checked={resultSelectedCheckbox === "36"}
                      onChange={() => handleResultCheckboxChange("36")}
                    />
                    <label className="form-check-label" htmlFor="roulette36">
                      36
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
export default JeetoJokerGame;
