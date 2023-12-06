import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import moment from "moment"

function TransactionReport() {
  let apiBaseURL = "http://localhost:5000";
  const [data, setData] = useState([]); 
  const columns = [
    { title: "Serial No", render: (rowData) => rowData.tableData.id + 1 },
    { title: "UserName", field: "username" },
    { title: "User ID", field: "distributor_id" },
    { title: "Balance", field: "points",filtering:true },
    {
      title: "Transaction Date",
      render: rowData => rowData.created_at?moment(rowData.created_at).format('YYYY-M-D h:mm:ss'):'Not login yet',
      filtering:true,
    }, 
  ];
  //get Agents
  const getReports = async () => {
    await axios({
      method: "GET",
      url: `${apiBaseURL}/user/Transaction`,
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
        title="Points Transactions Report"
        data={data}
        columns={columns} 
      />
    </div> 
      </>
  );
}
export default TransactionReport;
