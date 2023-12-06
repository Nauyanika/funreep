import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import moment from "moment"

function TransactionHistory() {
  let apiBaseURL = "http://localhost:5000";
  const [data, setData] = useState([]);
  const columns = [
    { title: "Sl No", render: (rowData) => rowData.tableData.id + 1 },
    { title: "User Name",  field:"user_id"},
    { title: "Order ID", field: "order_id" },
    { title: "Amount",  render: rowData =>`Rs ${rowData.txn_amount} `},
    { title: "TXN ID", field: "local_txn_id", filtering: true }, 
    {
      title: "Transaction Date", render: rowData => rowData.txn_date ? moment(rowData.txn_date).format('YYYY-M-D h:mm:ss') : 'Not login yet',
      filtering: true,
    },
  ];
  //get Agents
  const getReports = async () => {
    await axios({
      method: "GET",
     url: `${apiBaseURL}/user/TransactionHistory`,
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
    <>
      <div className="col-12 col-sm-6 col-md-3">
        Transaction History
      </div>
      <div className="card card-outline card-info">
        <MaterialTable
          title="Transaction Records"
          data={data}
          columns={columns}
        />
      </div>
    </>
  );
}
export default TransactionHistory