import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import '../../style/Contact.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
 
import axios from "axios";
import { apiBaseURL } from "../../config";
// import { authToken } from "../../authToken";
 
function PlayerHistory() {
    const [data, setData] = useState([]); 
    //get Agents
    const gameHistory = async () => {
      await axios
        .get(`${apiBaseURL}/api/games/playersHistory`)
        .then(function (response) {
          if (response.data.status === 200) {
            console.log(response.data, "data");
            setData(response.data.data);
          }
        })
        .catch(function (error) {
          // history.push("/login")
        });
    };
   
 
    //get Agents
   
    const columns = [
            { title: "Serial No", render: rowData => rowData.tableData.id + 1 },
      { title: "Username", render: rowData => rowData.username?rowData.username :"Guest"  },
      { title: "Users ID", field: "player_id" },
      { title: "Game Name", field: "game_name" },
      { title: "Total Bet",render: rowData => (rowData.total_bet && rowData.total_bet>0)?rowData.total_bet :'0542' },
      { title: "Total Won",render: rowData =>(rowData.total_win && rowData.total_win>0)?rowData.total_win :'51255'},
      { title: "Ntp", frender: rowData => rowData.id + 1254521},
      { title: "Ntp Percent", field: "percent" },
      // { title: "Status", field: "status" }
    ];
  
    useEffect(() => {
      gameHistory();
      // fetch("/api/transaction")
      //     .then((response) => response.json())
      //     .then(json => setData(json))
    }, []);
    return (
       <>
        <div className="card card-outline card-info">
      <MaterialTable
        title="Players History"
        data={data}
        columns={columns}
        options={{ actionsColumnIndex: -1 }} 
      />
    </div>
       </>
    )
}
export default PlayerHistory
