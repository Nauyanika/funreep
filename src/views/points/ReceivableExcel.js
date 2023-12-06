import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";

import "../../style/Contact.css";
import axios from "axios";
// import { apiBaseURL } from "../../config";
import moment from "moment";
import ReactHTMLTableToExcel from "react-html-table-to-excel";


import Swal from 'sweetalert2'
function ReceivableExcel() {
    let apiBaseURL = "http://localhost:5000"
    //let apiBaseURL  = "http://13.53.130.74:5000"

    const [data, setData] = useState([]);

    //get Agents
    const getPlayers = async () => {
        await axios
            .get(`${apiBaseURL}/user/PointHistory`)
            .then(function (response) {
                if (response.data.status === 200) {
                    console.log(response.data, "data");
                    const result = response.data.data.filter((item) => {
                        return item.email != "admin@admin.com"

                    })
                    setData(result);
                }
            })
            .catch(function (error) {
            });
    };

    //get Agents
    const changeStatus = async (distributor, status, message) => {

        Swal.fire({
            title: `Are you sure? Want to ${message}`,
            // text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, ${message} it!`
        }).then((result) => {
            if (result.isConfirmed) {
                let statusCode;
                if (status === 1) {
                    statusCode = 0
                } else {
                    statusCode = 0
                }
                let updateData = {
                    active: statusCode,
                    distributor_id: distributor
                }
                axios.put(`${apiBaseURL}/api/users/changeStatusDistributor`, updateData)
                    .then(function (response) {
                        if (response.data.status === 200) {
                            getPlayers();
                            Swal.fire(
                                `${response.data.message}!`,
                                `User status have been ${response.data.message}`,
                                'success'
                            )
                        } else {
                            Swal.fire(
                                `${response.data.message}!`,
                                'error'
                            )
                        }
                    })
                    .catch(function (error) {
                        Swal.fire(
                            `Something Went wrong!`,
                            'error'
                        )
                    });
            }
        })
    };

    //get Agents
    const deleteUser = async (distributor) => {
        Swal.fire({
            position: "top-start",
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${apiBaseURL}/api/users/deleteDistributor/${distributor}`)
                    .then(function (response) {
                        console.log(response)
                        if (response.data.status === 200) {
                            getPlayers();
                            Swal.fire(
                                `${response.data.message}!`,
                                `User have been ${response.data.message}`,
                                'success'
                            )
                        } else {
                            Swal.fire(
                                `${response.data.message}!`,
                                'error'
                            )
                        }
                    })
                    .catch(function (error) {
                        Swal.fire(
                            `Something Went wrong!`,
                            'error'
                        )
                    });
            }
        })
    };
    
    useEffect(() => {
        getPlayers();
        // fetch("/api/transaction")
        //     .then((response) => response.json())
        //     .then(json => setData(json))
    }, []);

    return (
        <>
        <div className="card card-outline card-info"  >
         <MaterialTable
                 title="Receivable Notification"
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
                        <th>Point</th>
                        <th>From User</th>
                        <th>To User</th>
                        <th>Transaction Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((res) =>
                        <tr>
                            <td>{res.point}</td>
                            <td>{res.sender}</td>
                            <td>{res.receiver}</td>
                            <td>{res.createdat}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
        
    );
}
export default ReceivableExcel;
