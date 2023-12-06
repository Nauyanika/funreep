import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import Swal from 'sweetalert2'  
import moment from "moment"
 function WithdrawRequest() {
    let apiBaseURL = "http://localhost:5000";
    const [data, setData] = useState([]); 

    //Update Status 

    //get Agents
  const verifyBankAccount = async (txnId,bankID,userId) => { 
     
    Swal.fire({
        title: `Are you sure? Want to Approved`,
        // text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes, Approved it!`
      }).then((result) => {
        if (result.isConfirmed) {   
            let updateData = {
                user_id:userId,
                bank_detail_id:bankID,
                txn_id:txnId
            }
            axios.put(`${apiBaseURL}/payouts/VerifyBankAccountStatus`,updateData)
            .then(function (response) { 
              if (response.data.status === 200) { 
                getReports()
                  Swal.fire(
                    `Verified!`,
                    `User status have been ${response.data.message}`,
                    'success'
                  )
              }else{
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
    const acceptPayouts = async (txnId,bankID,userId) => { 
      console.log(txnId,bankID,userId)
      Swal.fire({
          title: `Are you sure? Want to Accept...`,
          // text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: `Yes, Accept it!`
        }).then((result) => {
          if (result.isConfirmed) {   
              let updateData = {
                  user_id       : userId,
                  bank_detail_id: bankID,
                  txn_id        : txnId
              }
              axios.put(`${apiBaseURL}/payouts/acceptPayouts`,updateData)
              .then(function (response) { 
                console.log(response,'response')
                if (response.data.status === 200) { 
                  getReports()
                    Swal.fire(
                      `Accepted!`,
                      `User request have been ${response.data.message}`,
                      'success'
                    )
                }else{
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
        { title: "Sr_No", render: (rowData) => rowData.tableData.id + 1 },
        
        { 
          title: "Status", field: "is_verified" ,
          render: row =>row.is_verified ==1?<div className="d-flex justify-content-between"> 
           <button 
           type="button" 
           disabled={(row.is_verified == 0 || row.is_type ==11|| row.is_type ==6)?"disabled":row.is_verified ==2?"disabled":""} 
           className={ (row.is_type ==6 )?"btn btn-success ml-2":(row.is_type ==11 )?"btn btn-danger ml-2":"btn btn-primary ml-2"} onClick={() => acceptPayouts(row.transaction_id,row.bank_detail_id,row.user_id)}>
             { (row.is_type ==6 )?"Debited":(row.is_type ==11 )?"Rejected":"Accept"}
           </button> 
          </div>:
         row.is_verified ==0?<button type="button" className="btn btn-warning" onClick={() => verifyBankAccount(row.txn_id,row.bank_detail_id,row.user_id)}>Verify</button>:row.is_verified ==1?<span class="badge badge-success p-2">Verified</span>:<span class="p-2 badge badge-danger">Rejected</span>
        },

        // { title: "BANK", field: "is_verified" , render: row =>row.is_verified ==0?<button type="button" className="btn btn-primary" onClick={() => alert(row.txn_id)}>Verify</button>:row.is_verified ==1?<span class="badge badge-success p-2">Verified</span>:<span class="p-2 badge badge-danger">Rejected</span> },
        { title: "Amount",  render: rowData =>`Rs ${rowData.txn_amount}`},
        { title: "Phone", field: "phone" }, 
        { title: "Email ID", field: "email" },
        { title: "TXN ID", field: "txn_id",filtering:true },  
        { title: "Mode", field: "is_request_mode",filtering:true },
        { 
        title: "TXN_Date",
          render: rowData => rowData.txn_date?moment(rowData.txn_date).format('YYYY-M-D h:mm:ss'):'Not login yet',
          filtering:true,
        }, 
      ];
    //get Agents
    const getReports = async () => {
        await axios({
            method: "GET",
            url: `${apiBaseURL}/money/withdrawRequestHistory`,
            // data: user,
            // headers: {"Authorization" : `Bearer ${authToken}`}
        })    
        .then(function (response) {
          if (response.data.status === 200)
          {
              console.log(response.data.data,'adfdfdf')
            setData(response.data.data);
          } 
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    useEffect(() => {
      getReports();
    }, []);
  //get Agents
  const changeStatus = async (distributor,status,message) => { 
     
    // Swal.fire({
    //     title: `Are you sure? Want to ${message}`,
    //     // text: "You won't be able to revert this!",
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: `Yes, ${message} it!`
    //   }).then((result) => {
    //     if (result.isConfirmed) {  
    //         let statusCode;
    //         if(status ===1){
    //           statusCode =0
    //         }else{
    //           statusCode =0
    //         }
    //         let updateData = {
    //             active:statusCode,
    //             distributor_id:distributor
    //         }
    //         axios.put(`${apiBaseURL}/api/users/changeStatusDistributor`,updateData)
    //         .then(function (response) { 
    //           if (response.data.status === 200) {
    //               getPlayers();
    //               Swal.fire(
    //                 `${response.data.message}!`,
    //                 `User status have been ${response.data.message}`,
    //                 'success'
    //               )
    //           }else{
    //             Swal.fire(
    //                 `${response.data.message}!`, 
    //                 'error'
    //               )
    //           }
    //         })
    //         .catch(function (error) {
    //             Swal.fire(
    //                 `Something Went wrong!`, 
    //                 'error'
    //               )
    //         }); 
    //     }
    //   })
  };

  //get Agents
  const deleteUser = async (distributor) => {
    // Swal.fire({
    //     title: 'Are you sure?',
    //     text: "You won't be able to revert this!",
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Yes, delete it!'
    //   }).then((result) => {
    //     if (result.isConfirmed) {  
    //         axios.delete(`${apiBaseURL}/api/users/deleteDistributor/${distributor}`)
    //         .then(function (response) {
    //             console.log(response )
    //           if (response.data.status === 200) {
    //               getPlayers();
    //               Swal.fire(
    //                 `${response.data.message}!`,
    //                 `User have been ${response.data.message}`,
    //                 'success'
    //               )
    //           }else{
    //             Swal.fire(
    //                 `${response.data.message}!`, 
    //                 'error'
    //               )
    //           }
    //         })
    //         .catch(function (error) {
    //             Swal.fire(
    //                 `Something Went wrong!`, 
    //                 'error'
    //               )
    //         }); 
    //     }
    //   })
};
    return ( 
        <><div className="card card-outline card-info">
        <MaterialTable
          title="Withdraw Request"
          data={data}
          columns={columns} 
        // //   options={{ actionsColumnIndex: -1 }}
        //   actions={[
        //     (rowData) => {
        //       return {
        //         icon: rowData.active == 1 ? "adminpanelsettings" : "accessibilitynow",
        //         tooltip: rowData.active == 1 ? "Blocked" : "Active",
        //         onClick: (event, row) => changeStatus(row.distributor_id,row.active,`${row.active == 0 ? "block" : "unblock"}`),
        //       };
        //     },
        //     {
        //       icon: "delete",
        //       tooltip: "Remove Distributor",
        //       onClick: (event, rowData) => deleteUser(rowData.distributor_id),
        //     },
        //   ]}
        />
      </div> 
        </>
    );
  }
export default WithdrawRequest