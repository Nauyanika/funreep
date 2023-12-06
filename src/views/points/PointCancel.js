import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import moment from "moment"

function PointCancel() {
  let apiBaseURL = "http://localhost:5000";
  const [data, setData] = useState([]); 
  const columns = [
    { title: "Serial No", render: (rowData) => rowData.tableData.id + 1 },
    { title: "Transferred To", field: "Tranferred_to" },
    { title: " Type ", field: "Type" },
    { title: "Amount", field: "Amount",filtering:true },
    {
      title: " Cancel Time",
      render: rowData => rowData.Cancel_time?moment(rowData.Cancel_time).format('YYYY-M-D h:mm:ss'):'Not login yet',
      filtering:true,
    }, 
  ];
  //get Agents
  const getReports = async () => {
    await axios({
      method: "GET",
      url: `${apiBaseURL}/user/PointCancel`,
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
        title="Points Cancel Report"
        data={data}
        columns={columns} 
      />
    </div> 
      </>
  );
}
export default PointCancel;
