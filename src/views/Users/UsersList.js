import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";

import "../../style/Contact.css";
import axios from "axios";
// import { apiBaseURL } from "../../config";
import moment from "moment";

import Swal from 'sweetalert2'
function UsersList() {
    let apiBaseURL = "http://localhost:5000"
    const [data, setData] = useState([]);

    //get Agents
    const getPlayers = async () => {
        await axios
            .get(`${apiBaseURL}/api/users/`)
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
    const columns = [
        { title: "Sl No.", render: rowData => rowData.tableData.id + 1 },
        { title: "Username", render: rowData => (rowData.username) ? rowData.username : 'Guest' },
        { title: "Users ID", field: "user_id" },
        { title: "Parent", field: "distributor_name" },
        // { title: "Passcode", field: "pin" },
        { title: "Balance", render: rowData => (rowData.balance && rowData.balance > 0) ? rowData.balance : 0.00 },
        { title: "Last Login", render: rowData => rowData.last_logged_in ? moment(rowData.last_logged_in).format('YYYY-M-D h:mm:ss') : 'Not login yet' },
        { title: "Status", render: rowData => rowData.IsBlocked === 1 ? 'Blocked' : "Active" }
    ];

    useEffect(() => {
        getPlayers();
        // fetch("/api/transaction")
        //     .then((response) => response.json())
        //     .then(json => setData(json))
    }, []);

    return (
        <div className="card card-outline card-info"  >
            <MaterialTable
                title="Users List"
                data={data}
                columns={columns}
                options={{ actionsColumnIndex: -1 }}
                actions={[
                    (rowData) => {
                        return {
                            icon: rowData.IsBlocked === 1 ? "block" : "settingsremote",
                            tooltip: rowData.IsBlocked === 1 ? "Blocked" : "Active",
                            onClick: (event, row) => changeStatus(row.distributor_id, row.active, `${row.active === 0 ? "block" : "unblock"}`),
                        };
                    },
                    {
                        icon: "delete",
                        tooltip: "Remove Distributor",
                        onClick: (event, rowData) => deleteUser(rowData.distributor_id),
                    },
                ]}
            />
        </div>
    );
}
export default UsersList;
