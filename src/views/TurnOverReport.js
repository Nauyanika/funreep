import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import '../style/Contact.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
// import { Link } from 'react-router-dom'

let apiBaseURL  = "http://localhost:5000"

function PlayerHistory() {

    const [data, setData] = useState([])

    const columns = [
        { title: 'Sl No.', field: "transaction_id" },
        { title: 'Username', field: "txn_id" },
        { title: "User ID", field: "user_id" },
        { title: "Play Point", field: "txn_amount" },
        { title: "Winning Point", field: "txn_date" },
        // { title: "Status", field: "status" }
    ]

    useEffect(() => {
        fetch("/api/transaction")
            .then((response) => response.json())
            .then(json => setData(json))
    }, [])


    const [selectedDate, setSelectedDate] = useState(null)
    return (
        <div  style={{ minHeight: "300px" ,marginLeft: "250px",transition: "margin-left .3s ease-in-out",marginBottom:"30px"}}>
      <MaterialTable
        title="Turn Over Reports"
        data={data}
        columns={columns}
        options={{ actionsColumnIndex: -1 }}
        actions={[
          (rowData) => {
            return {
              icon: rowData.active == 1 ? "block" : "settingsremote",
              tooltip: rowData.active == 1 ? "Blocked" : "Active",
            //   onClick: (event, row) =>  ,
            };
          },
          {
            icon: "delete",
            tooltip: "Remove Distributor",
            // onClick: (event, rowData) => ,
          },
        ]}
      />
    </div>
    )
}
export default PlayerHistory
