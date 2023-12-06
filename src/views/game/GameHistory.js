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



function GameHistory() {
    const [data, setData] = useState([]);

    // get Agents
    const gameReports = async () => {
      await axios
        .get(`${apiBaseURL}/api/games/playHistory`)
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
            { title: "Serial No", render: rowData => rowData.tableData.id + 1 },
            { title: "Users ID", field: "game_id" },
            { title: "Game Name", field: "game_name" },
            { title: "Win Position", render: rowData => rowData.win_no?rowData.win_no :0 },
            { title: "Date & Time", render: rowData => moment(rowData.created_at).format("DD-MM-YYYY h:mm:ss ") }, 
            { title: "Details", field: "points" },
            { title: "Bonus Spin", render: rowData => rowData.win_no?rowData.win_no :0 }, 
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
export default GameHistory
