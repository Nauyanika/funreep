import React, { useState, useEffect } from "react";
import MaterialTable from "material-table"; 
import "../../style/Contact.css";
import axios from "axios";
import { apiBaseURL } from "../../config";
import moment from "moment";

import Swal from 'sweetalert2'
function Cards() {
    let apiBaseURL = "http://localhost:5000"
    const [data, setData] = useState([]);

    //get Agents
    const getPlayers = async () => {
        await axios
            .get(`${apiBaseURL}/game/contestTable`)
            .then(function (response) {
                if (response.data.status === 200) {
                    console.log('aaaaa', response.data, "data");
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

    const columns = [
        { title: "No.", render: rowData => rowData.tableData.id + 1 }, 
        { title: "#ID", field: "tournament_id" }, 
        { title: "Type", field: "category_name" },
        { title: "Entry Fee",  render: rowData =>`Rs ${rowData.entry_fee }`},
        { title: "Prize Pool",  render: rowData =>`Rs ${rowData.prize_pool}`},
        { title: "Bonus",  render: rowData =>`Rs ${( (rowData.entry_fee*5)/100 )}`},
        { title: "Status", render: rowData => rowData.IsBlocked === 1 ? 'Blocked' : "Active" }
    ];

    useEffect(() => {
        getPlayers(); 
    }, []);

    return (
        <div className="card card-outline card-info"  >
            <MaterialTable
                title="Context Table"
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

                ]}
            />
        </div>
    );
}
export default Cards;
