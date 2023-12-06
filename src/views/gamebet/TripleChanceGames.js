import React, { useState, useEffect } from "react";
import "../../style/Contact.css";
import axios from "axios";
import { apiBaseURL } from "../../config";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";

// import { authToken } from "../../../authToken";
function TripleChanceGames() {
  const [data, setData] = useState([]);
  const [value1, setvalue1] = useState("")

  const columns = [
    { title: "Serial No", render: rowData => rowData.tableData.id + 1 },
   // { title: "Player ID", field: "playername" },
    { title: "Round Count", field: "RoundCount" },

    //{ title: "CardResult", field: "Cardresult" },
    //{ title: "FinalResult", field: "finalresult" },
    { title: "Card_A_amountBetValue", field: "Card_A_amount"},
    { title: "Card_2_amountBetValue", field: "Card_2_amount"},
    { title: "Card_3_amountBetValue", field: "Card_3_amount"},
    { title: "Card_4_amountBetValue", field: "Card_4_amount"},
    { title: "Card_5_amountBetValue", field: "Card_5_amount"},
    { title: "Card_6_amountBetValue", field: "Card_6_amount"},
    { title: "Card_7_amountBetValue", field: "Card_7_amount"},
    { title: "Card_8_amountBetValue", field: "Card_8_amount"},
    { title: "Card_9_amountBetValue", field: "Card_9_amount"},
    { title: "Card_10_amountBetValue", field: "Card_10_amount"},
    { title: "Card_J_amountBetValue", field: "Card_J_amount"},
    { title: "Card_Q_amountBetValue", field: "Card_Q_amount"},
    { title: "Card_K_amountBetValue", field: "Card_K_amount"},
    { title: "Card_Heart_amountBetValue", field: "Card_Heart_amount"},
    { title: "Card_Diamond_amountBetValue", field: "Card_Diamond_amount"},
    { title: "Card_Club_amountBetValue", field: "Card_Club_amount"},
    { title: "Card_Spade_amountBetValue", field: "Card_Spade_amount"},
    { title: "Card_Red_amountBetValue", field: "Card_Red_amount"},
    { title: "Card_Black_amountBetValue", field: "Card_Black_amount"},
    { title: "Card_A_6_amountBetValue", field: "Card_A_6_amount"},
    { title: "Card_seven_amountBetValue", field: "Card_seven_amount"},
    { title: "Card_8_K_amountBetValue", field: "Card_8_K_amount"},

    { title: "Date & Time", render: rowData => moment(rowData.playedtime).format("DD-MM-YYYY h:mm:ss ") }
  ];

  useEffect(() => {
    axios
      .get(`${apiBaseURL}/user/gamerunningandarbahar`)
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
  }, []);

  useEffect(() => {
    axios
      // .get(`${apiBaseURL}/user/PointHistory`)
      .get(`${apiBaseURL}/user/getAdminandarbahar`)

      .then(function (response) {
        if (response.data.status === 200) {
          console.log(response.data, "data");
          // setvalue1(response.data.data.value1)
          //setvalue2(response.data.data.value2)
          //setvalue3(response.data.data.value3)
 
          //setData(response.data.data);
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

  //checkbox controller

  const [symbolSelectedCheckbox, setSymbolSelectedCheckbox] = useState("");
  const [winNoSelectedCheckbox, setWinNoSelectedCheckbox] = useState("");

  const handleSymbolCheckboxChange = (value) => {
    if (symbolSelectedCheckbox === value) {
      setSymbolSelectedCheckbox("");
    } else {
      setSymbolSelectedCheckbox(value);
    }
  };

  const handleWinNoCheckboxChange = (value) => {
    if (winNoSelectedCheckbox === value) {
      setWinNoSelectedCheckbox("");
    } else {
      setWinNoSelectedCheckbox(value);
    }
  };

  //clear button
  const handleClearButtonClick = (event) => {
    event.preventDefault();
    setSymbolSelectedCheckbox("");
    setWinNoSelectedCheckbox("");
//setvalue1(-1)
axios.post("http://13.48.18.24:5000/user/Adminandarbahar", { value:-1 })

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
});  };

  // clear button end

  const handleSaveButtonClick = (event) => {
    event.preventDefault();
    var value=0
        if (symbolSelectedCheckbox == 0) {
          if ((winNoSelectedCheckbox== 0)) {
            value = 39;
          }
          if ((winNoSelectedCheckbox == 1)) {
            value = 40;
          }
          if (winNoSelectedCheckbox == 2) {
            value = 41;
          }
          if (winNoSelectedCheckbox == 3) {
            value = 42;
          }
          if (winNoSelectedCheckbox == 4) {
            value = 43;
          }
          if (winNoSelectedCheckbox == 5) {
            value = 44;
          }
          if (winNoSelectedCheckbox == 6) {
            value = 45;
          }
          if (winNoSelectedCheckbox == 7) {
            value = 46;
          }
          if (winNoSelectedCheckbox == 8) {
            value = 47;
          }
          if (winNoSelectedCheckbox == 9) {
            value = 48;
          }
          if (winNoSelectedCheckbox == 10) {
            value = 49;
          }
          if (winNoSelectedCheckbox == 11) {
            value = 50;
          }
          if (winNoSelectedCheckbox == 12) {
            value = 51;
          }
        }

        if (symbolSelectedCheckbox == 1) {
          if ((winNoSelectedCheckbox == 0)) {
            value = 13;
          }
          if ((winNoSelectedCheckbox == 1)) {
            value = 14;
          }
          if (winNoSelectedCheckbox == 2) {
            value = 15;
          }
          if (winNoSelectedCheckbox == 3) {
            value = 16;
          }
          if (winNoSelectedCheckbox == 4) {
            value = 17;
          }

          if (winNoSelectedCheckbox == 5) {
            value = 18;
          }

          if (winNoSelectedCheckbox == 6) {
            value = 19;
          }
          if (winNoSelectedCheckbox == 7) {
            value = 20;
          }

          if (winNoSelectedCheckbox == 8) {
            value = 21;
          }

          if (winNoSelectedCheckbox == 9) {
            value = 22;
          }

          if (winNoSelectedCheckbox == 10) {
            value = 23;
          }

          if (winNoSelectedCheckbox == 11) {
            value = 24;
          }

          if (winNoSelectedCheckbox == 12) {
            value = 25;
          }
        }

        if (symbolSelectedCheckbox == 2) {
          if ((winNoSelectedCheckbox == 0)) {
            value = 0;
          }
          if ((winNoSelectedCheckbox == 1)) {
            value = 1;
          }
          if ((winNoSelectedCheckbox == 2)) {
            value = 2;
          }
          if (winNoSelectedCheckbox == 3) {
            value = 3;
          }
          if (winNoSelectedCheckbox == 4) {
            value = 4;
          }

          if (winNoSelectedCheckbox == 5) {
            value = 5;
          }

          if (winNoSelectedCheckbox == 6) {
            value = 6;
          }
          if (winNoSelectedCheckbox == 7) {
            value = 7;
          }

          if (winNoSelectedCheckbox == 8) {
            value = 8;
          }

          if (winNoSelectedCheckbox == 9) {
            value = 9;
          }

          if (winNoSelectedCheckbox == 10) {
            value = 10;
          }

          if (winNoSelectedCheckbox == 11) {
            value = 11;
          }

          if (winNoSelectedCheckbox == 12) {
            value = 12;
          }
        }


        if (symbolSelectedCheckbox == 3) {
          if ((winNoSelectedCheckbox == 0)) {
            value = 26;
          }
          if ((winNoSelectedCheckbox == 1)) {
            value = 27;
          }
          if ((winNoSelectedCheckbox == 2)) {
            value = 28;
          }
          if (winNoSelectedCheckbox == 3) {
            value = 29;
          }
          if (winNoSelectedCheckbox == 4) {
            value = 30;
          }

          if (winNoSelectedCheckbox == 5) {
            value = 31;
          }

          if (winNoSelectedCheckbox == 6) {
            value = 32;
          }
          if (winNoSelectedCheckbox == 7) {
            value = 33;
          }

          if (winNoSelectedCheckbox == 8) {
            value = 34;
          }

          if (winNoSelectedCheckbox == 9) {
            value = 35;
          }

          if (winNoSelectedCheckbox == 10) {
            value = 36;
          }

          if (winNoSelectedCheckbox == 11) {
            value = 37;
          }

          if (winNoSelectedCheckbox == 12) {
            value = 38;
          }
        }
//setvalue1(value)

    axios.post("http://13.48.18.24:5000/user/Adminandarbahar", { value: value })
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

  //checkbox end

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
            <li className="nav-item">
              <span className="ml-3 badge bg-primary">112 </span>{" "}
              <span className="ml-3 badge bg-warning">00:59 </span>
              <Link className="nav-link " to="/AndarbaharGame">
                {" "}
                AndarbaharGame{" "}
              </Link>
            </li>

            <li className="nav-item ml-3">
              <span className="badge bg-primary">112 </span>{" "}
              <span className="ml-3 badge bg-warning">00:59 </span>
              <Link className="nav-link" to="/JeetoJokerGame">
                {" "}
                Roullet{" "}
              </Link>
            </li>
            <li className="nav-item ml-3">
              <span className="badge bg-primary">112 </span>{" "}
              <span className=" ml-2 badge bg-warning">00:59 </span>
              <Link className="nav-link " to="/16CardsGame">
                {" "}
                sevenup
              </Link>
            </li>
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
                    <h3 className="card-title">AndarBahar Game</h3>
                  </div>
                </div>

                <form className="shadow-sm p-3">
                  <div className="row">
                    <div className="col-md-4">
                      <button
                        className="btn btn-primary mr-2"
                        style={{ marginBottom: "10px" }}
                        onClick={handleClearButtonClick}
                      >
                        Clear
                      </button>
                    </div>
                    <div className="col-md-4">
                      <button
                        className="btn btn-success"
                        style={{ marginBottom: "20px", marginLeft: "30px" }}
                        onClick={handleSaveButtonClick}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4" style={{ marginLeft: "10px" }}>
                      Symbol
                    </div>
                    <div
                      className="col-md-4"
                      style={{ marginBottom: "20px", marginLeft: "20px" }}
                    >
                      Win No.
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4" style={{ marginLeft: "10px" }}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="symbol"
                          id="symbol0"
                          value="0"
                          checked={symbolSelectedCheckbox === "0"}
                          onChange={() => handleSymbolCheckboxChange("0")}
                        />
                        <label className="form-check-label" htmlFor="symbol0">
                          Spade
                        </label>
                      </div>

                      <div className="form-check pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="symbol"
                          id="symbol1"
                          value="1"
                          checked={symbolSelectedCheckbox === "1"}
                          onChange={() => handleSymbolCheckboxChange("1")}
                        />
                        <label className="form-check-label" htmlFor="symbol1">
                          Heart
                        </label>
                      </div>

                      <div className="form-check pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="symbol"
                          id="symbol2"
                          value="2"
                          checked={symbolSelectedCheckbox === "2"}
                          onChange={() => handleSymbolCheckboxChange("2")}
                        />
                        <label className="form-check-label" htmlFor="symbol2">
                          Diamond
                        </label>
                      </div>

                      <div className="form-check pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="symbol"
                          id="symbol3"
                          value="3"
                          checked={symbolSelectedCheckbox === "3"}
                          onChange={() => handleSymbolCheckboxChange("3")}
                        />
                        <label className="form-check-label" htmlFor="symbol3">
                          Club
                        </label>
                      </div>
                    </div>

                    <div
                      className="col-md-4"
                      style={{ marginLeft: "20px", marginTop: "-23px" }}
                    >
                      <div className="form-check pt-4">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="winNo"
                          id="winNo4"
                          value="0"
                          checked={winNoSelectedCheckbox === "0"}
                          onChange={() => handleWinNoCheckboxChange("0")}
                        />
                        <label className="form-check-label" htmlFor="winNo4">
                          A
                        </label>
                      </div>
                      <div className="form-check pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="winNo"
                          id="winNo5"
                          value="1"
                          checked={winNoSelectedCheckbox === "1"}
                          onChange={() => handleWinNoCheckboxChange("1")}
                        />
                        <label className="form-check-label" htmlFor="winNo5">
                          1
                        </label>
                      </div>
                      <div className="form-check pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="winNo"
                          id="winNo6"
                          value="2"
                          checked={winNoSelectedCheckbox === "2"}
                          onChange={() => handleWinNoCheckboxChange("2")}
                        />
                        <label className="form-check-label" htmlFor="winNo6">
                          2
                        </label>
                      </div>
                      <div className="form-check pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="winNo"
                          id="winNo7"
                          value="3"
                          checked={winNoSelectedCheckbox === "3"}
                          onChange={() => handleWinNoCheckboxChange("3")}
                        />
                        <label className="form-check-label" htmlFor="winNo7">
                          3
                        </label>
                      </div>
                      <div className="form-check pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="winNo"
                          id="winNo8"
                          value="4"
                          checked={winNoSelectedCheckbox === "4"}
                          onChange={() => handleWinNoCheckboxChange("4")}
                        />
                        <label className="form-check-label" htmlFor="winNo8">
                          4
                        </label>
                      </div>
                      <div className="form-check pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="winNo"
                          id="winNo9"
                          value="5"
                          checked={winNoSelectedCheckbox === "5"}
                          onChange={() => handleWinNoCheckboxChange("5")}
                        />
                        <label className="form-check-label" htmlFor="winNo9">
                          5
                        </label>
                      </div>
                      <div className="form-check pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="winNo"
                          id="winNo10"
                          value="6"
                          checked={winNoSelectedCheckbox === "6"}
                          onChange={() => handleWinNoCheckboxChange("6")}
                        />
                        <label className="form-check-label" htmlFor="winNo10">
                          6
                        </label>
                      </div>
                      <div className="form-check pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="winNo"
                          id="winNo11"
                          value="7"
                          checked={winNoSelectedCheckbox === "7"}
                          onChange={() => handleWinNoCheckboxChange("7")}
                        />
                        <label className="form-check-label" htmlFor="winNo11">
                          7
                        </label>
                      </div>
                      <div className="form-check pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="winNo"
                          id="winNo12"
                          value="8"
                          checked={winNoSelectedCheckbox === "8"}
                          onChange={() => handleWinNoCheckboxChange("8")}
                        />
                        <label className="form-check-label" htmlFor="winNo12">
                          8
                        </label>
                      </div>
                      <div className="form-check pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="winNo"
                          id="winNo13"
                          value="9"
                          checked={winNoSelectedCheckbox === "9"}
                          onChange={() => handleWinNoCheckboxChange("9")}
                        />
                        <label className="form-check-label" htmlFor="winNo13">
                          9
                        </label>
                      </div>
                      <div className="form-check pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="winNo"
                          id="winNo14"
                          value="10"
                          checked={winNoSelectedCheckbox === "10"}
                          onChange={() => handleWinNoCheckboxChange("10")}
                        />
                        <label className="form-check-label" htmlFor="winNo14">
                          J
                        </label>
                      </div>
                      <div className="form-check pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="winNo"
                          id="winNo15"
                          value="11"
                          checked={winNoSelectedCheckbox === "11"}
                          onChange={() => handleWinNoCheckboxChange("11")}
                        />
                        <label className="form-check-label" htmlFor="winNo15">
                          Q
                        </label>
                      </div>
                      <div className="form-check pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="winNo"
                          id="winNo16"
                          value="12"
                          checked={winNoSelectedCheckbox === "12"}
                          onChange={() => handleWinNoCheckboxChange("12")}
                        />
                        <label className="form-check-label" htmlFor="winNo16">
                          K
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
export default TripleChanceGames;
