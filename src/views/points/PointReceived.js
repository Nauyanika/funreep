import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import moment from "moment"

function PointReceived() {
  let apiBaseURL = "http://localhost:5000";
  const [data, setData] = useState([]); 
  const columns = [
    { title: "Serial No", render: (rowData) => rowData.tableData.id + 1 },
    { title: "From User", field: "FromUser" },
    { title: " To User ", field: "ToUser" },
    { title: "Amount", field: "Amount",filtering:true },
    {
      title: "Transaction Date",
      render: rowData => rowData.TransactionData?moment(rowData.TransactionData).format('YYYY-M-D h:mm:ss'):'Not login yet',
      filtering:true,
    }, 
  ];
  //get Agents
  const getReports = async () => {
    await axios({
      method: "GET",
      url: `${apiBaseURL}/user/PointReceived`,
      // data: user,
      // headers: {"Authorization" : `Bearer ${authToken}`}
    })
      .then(function (response) {
        if (response.data.status === 200) {
          setData(response.data.data);
        } else {
         
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getReports();
  }, []);

  return ( 
      <><div className="card card-outline card-info">
      <MaterialTable
        title="Points Received Report"
        data={data}
        columns={columns} 
      />
    </div> 
      </>
  );
}
export default PointReceived;
