import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

export default function Home() {
 // let apiBaseURL = "http://localhost:5000";
 let apiBaseURL = "http://localhost:5000";

  let [dateTime, setDateTime] = useState();
  let [todayDate, settodayDate] = useState();
  const timer = setInterval(() => {
    let current = new Date();
    let date = moment(current).format("dddd DD MMMM,YYYY");
    const times = `${current.getHours()}:${
      current.getMinutes() + 1
    }:${current.getSeconds()}`;
    setDateTime(times);
    settodayDate(date);
  }, 1000);

  const [winngPoints, setwinngPoints] = useState({});
  const [userData, setuserData] = useState([]);
  const [destriData, setDestriData] = useState([]);
  //get Agents
  const getData = async () => {
    //Get users
    await axios
      .get(`${apiBaseURL}/api/users/`)
      .then(function (response) {
        if (response.data.status === 200) {
          setuserData(response.data.data);
        }
      })
      .catch(function (error) {});
    //Get AGents
    await axios
      .get(`${apiBaseURL}/api/users/agents`)
      .then(function (response) {
        if (response.data.status === 200) {
          setDestriData(response.data.data);
        }
      })
      .catch(function (error) {});

    //Get Points
    await axios
      .get(`${apiBaseURL}/api/games/winnigPoints`)
      .then(function (response) {
        if (response.data.status === 200) {
          setwinngPoints(response.data.data[0]);
        }
      })
      .catch(function (error) {});
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
            <h1 className="m-0 p-2 bg-dark font-weith-bold text-primary"> 
                    {dateTime}
                  </h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item active"> 
                  <h1 className="m-0 p-2 bg-dark font-weith-bold text-primary"> 
                    {todayDate}
                  </h1>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-6 col-md-3">
          <div className="info-box">
            <span className="info-box-icon bg-info elevation-1">
              <i className="fas fa-users"></i>
            </span>

            <div className="info-box-content">
              <span className="info-box-text">
                {" "}
                <Link
                  to="/PlayersList"
                  className="font-weight-bold text-primary"
                >
                  Players
                </Link>
              </span>
              <span className="info-box-number">
                {userData.length < 10 ? `0${userData.length}` : userData.length}
              </span>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-3">
          <div className="info-box mb-3">
            <span className="info-box-icon bg-danger elevation-1">
              <i className="fas fa-user-group"></i>
            </span>

            <div className="info-box-content">
              <span className="info-box-text">
                <Link
                  to="/DistributorList"
                  className="font-weight-bold text-primary"
                >
                  Admin
                </Link>
              </span>
              <span className="info-box-number">
                {destriData.length < 10
                  ? `0${destriData.length}`
                  : destriData.length}
              </span>
            </div>
          </div>
        </div>

        <div className="clearfix hidden-md-up"></div>

        <div className="col-12 col-sm-6 col-md-3">
          <div className="info-box mb-3">
            <span className="info-box-icon bg-success elevation-1">
              <i className="fas fa-signal"></i>
            </span>

            <div className="info-box-content">
              <span className="info-box-text">Online</span>
              <span className="info-box-number">760</span>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-3">
          <div className="info-box mb-3">
            <span className="info-box-icon bg-warning elevation-1">
              <i class="fa-solid fa-coins"></i>
            </span>

            <div className="info-box-content">
              <span className="info-box-text">Turn Over</span>
              <span className="info-box-number">2,000</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
