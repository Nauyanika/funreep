import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import '../../style/Contact.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
 
import axios from "axios";
// import { apiBaseURL } from "../../config";
import moment from 'moment'
let apiBaseURL  = "http://localhost:5000"
// import { authToken } from "../../authToken";



function SevenUpGameHistory() {
    const [data, setData] = useState([]);

    // get Agents
    const gameReports = async () => {
      await axios
        .get(`${apiBaseURL}/user/SevenUpGamePlayHistory`)
        .then(function (response) {
          if (response.data.status === 200) { 
            setData(response.data.data);
          }
        })
        .catch(function (error) { 
        });
    };
   
 
    //get Agents
   
    const columns = [
      { title: "Serial No", render: (rowData) => rowData.tableData.id + 1 },
     //  { title: "Player ID", field: "playername" },
  
      { title: "RoundCount", field: "RoundCount" },
       { title: "Dice1", field: "dice1" },
      { title: "Dice2", field: "dice2" },
  
      { title: "WinType", field: "wintype" },
  
      //{ title: "Win_finalNo", field: "Win_finalNo" },
  
      {
        title: "Date & Time",
        render: (rowData) =>
          moment(rowData.playedtime).format("DD-MM-YYYY h:mm:ss "),
      },
    ];
  
    useEffect(() => {
      gameReports(); 
    }, []);
    return (
        <>
        <div  className="card card-outline card-info">
      <MaterialTable
        title="Game Plays History"
        data={data}
        columns={columns}
        options={{ actionsColumnIndex: -1 }} 
      />
    </div>
        </>
    )
}
export default  SevenUpGameHistory;
