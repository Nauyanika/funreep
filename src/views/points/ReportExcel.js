import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import axios from "axios";
import moment from "moment"

function ReportExcel() {
    let apiBaseURL = "http://localhost:5000";
    const [data, setData] = useState([]);
    
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
            <div className="card card-outline card-info"  >
                <MaterialTable
                    title="Transaction Records"
                    data={data}
                />
            </div>
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button btn btn-primary mb-4"
                table="table-to-xls"
                filename="tablexls"
                sheet="tablexls"
                buttonText="Export Data to Excel Sheet" />
            <table className="table" id="table-to-xls">
                <thead className="thead-dark">
                    <tr>
                        <th>User Name</th>
                        <th>Order Id</th>
                        <th>Amount</th>
                        <th>TXN Id</th>
                        <th>Transaction Date</th>

                    </tr>
                </thead>
                <tbody>
                    {data.map((res) =>
                        <tr>
                            <td>{res.user_id}</td>
                            <td>{res.order_id}</td>
                            <td>{res.txn_amount}</td>
                            <td>{res.local_txn_id}</td>
                            <td>{res.txn_date}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}
export default ReportExcel;