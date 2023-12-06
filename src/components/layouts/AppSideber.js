
import { Link } from "react-router-dom";
import React, { useState } from "react";
function AppSideber() {
  const tokenData = sessionStorage.getItem("token");
  if (!tokenData) {
    sessionStorage.removeItem("token");
    window.location.reload();
  }
  /* const [role, setRole] = useState(tokenData.user.role_id);
 */  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-3">
      <a href="index3.html" className="brand-link">
        <img
          src="logo6.png"
          alt="RoyalLuck"
          className="brand-image img-circle elevation-4"
        />
        <span className="brand-text font-weight-light">Admin</span>
      </a>
      <div className="sidebar"> 

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item menu-open">
              <Link to="/" className="nav-link active">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-header">Mini Admin1 Management</li>
{/*     starting to easer      */}

<li className="nav-item">
              <Link to="/AddMaster" className="nav-link">
                <i className="fa-solid fa-users nav-icon" />
                <p> Add Super Master </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/SuperMaster" className="nav-link">
                <i className="fa-solid fa-users nav-icon" />
                <p> View Super Master</p>
              </Link>
            </li>
            <li>
            <Link to="/AddSuperState" className="nav-link">
                <i className="fa-solid fa-users nav-icon" />
                <p> Add State(Super) </p>
              </Link>
            </li>
            <li>
            <Link to="/Superviewstate" className="nav-link">
                <i className="fa-solid fa-users nav-icon" />
                <p> View State(Super) </p>
              </Link>
            </li>



            <li>
            <Link to="/AddSuperCity" className="nav-link">
                <i className="fa-solid fa-users nav-icon" />
                <p> Add City(Super) </p>
              </Link>
            </li>
            <li>
            <Link to="/Superviewcity" className="nav-link">
                <i className="fa-solid fa-users nav-icon" />
                <p> View City(Super) </p>
              </Link>
            </li>
 



            <li>
            <Link to="/AddSuperMain" className="nav-link">
                <i className="fa-solid fa-users nav-icon" />
                <p> Add Main(Super) </p>
              </Link>
            </li>
            <li>
            <Link to="/SuperviewMain" className="nav-link">
                <i className="fa-solid fa-users nav-icon" />
                <p> View Main(Super) </p>
              </Link>
            </li>
 






            <li className="nav-header">Users Management</li>



           <li className="nav-item">
             <Link to="/ReportX" className="nav-link">
               <i className="fa-solid fa-arrow-right-arrow-left nav-icon" />
               <p>Download Transaction</p>
             </Link>
           </li>

           <li className="nav-item">
             <Link to="/TransferableX" className="nav-link">
               <i className="fa-solid fa-arrow-right-arrow-left nav-icon" />
               <p>Download Transferable</p>
             </Link>
           </li>

           <li className="nav-item">
             <Link to="/ReceivableX" className="nav-link">
               <i className="fa-solid fa-arrow-right-arrow-left nav-icon" />
               <p>Download Receivable</p>
             </Link>
           </li>       

           <li className="nav-header">Mini Admin2 Management</li>


<li className="nav-item">
              <Link to="/AdMasterId" className="nav-link">
                <i className="fa-solid fa-users nav-icon" />
                <p> Add Master Id</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/MasterId" className="nav-link">
                <i className="fa-solid fa-users nav-icon" />
                <p> View Master Id</p>
              </Link>
            </li>
       


             <li>
            <Link to="/AddMasterState" className="nav-link">
                <i className="fa-solid fa-users nav-icon" />
                <p> Add State(Master) </p>
              </Link>
            </li>
            <li>
            <Link to="/Superviewstate" className="nav-link">
                <i className="fa-solid fa-users nav-icon" />
                <p> View State(Master) </p>
              </Link>
            </li>



            <li>
            <Link to="/AddMasterCity" className="nav-link">
                <i className="fa-solid fa-users nav-icon" />
                <p> Add City(Master) </p>
              </Link>
            </li>
            <li>
            <Link to="/viewcityM" className="nav-link">
                <i className="fa-solid fa-users nav-icon" />
                <p> View City(Master) </p>
              </Link>
            </li>
 



            <li>
            <Link to="/AddMasterMain" className="nav-link">
                <i className="fa-solid fa-users nav-icon" />
                <p> Add Main(Master) </p>
              </Link>
            </li>
            <li>
            <Link to="/viewMainM" className="nav-link">
                <i className="fa-solid fa-users nav-icon" />
                <p> View Main(Super) </p>
              </Link>
            </li>
  

























<li className="nav-item">
              <Link to="/AddnewPlayer" className="nav-link">
                <i className="fa-solid fa-users nav-icon" />
                <p> Add Players</p>
              </Link>
            </li>
                                                                                     
          <li className="nav-item">
              <Link to="/PlayersList" className="nav-link">
                <i className="fa-solid fa-users nav-icon" />
                <p> View Players</p>
              </Link>
            </li>
             { /* <li className="nav-item">
              <Link to="/AddNewDistributor" className="nav-link">
                <i className="fa-solid fa-user-plus nav-icon" />
                <p>Blocked Players</p>
              </Link>
            </li> */}

           <li className="nav-header">Game histroy</li>
            {/* <li className="nav-item">
              <Link to="/PlayersHistrory" className="nav-link">
                <i className="fas fa-address-book nav-icon"></i>
                <p>PlayerHistory</p>
              </Link>
          </li>


          <li className="nav-item">

          <Link to="/GamePlayHistory" className="nav-link">
                <i className="fas fa-address-book nav-icon"></i>
                <p>GameHistory</p>
              </Link>
          </li> */}

{/* <li className="nav-item">

          <Link to="/AndarBaharGamePlayHistory" className="nav-link">
                <i className="fas fa-address-book nav-icon"></i>
                <p>AndarBaharGameHistory</p>
              </Link>
          </li>  */}
          <li className="nav-item">

          <Link to="/RoulletGamePlayHistory" className="nav-link">
                <i className="fas fa-address-book nav-icon"></i>
                <p>RoulletGameHistory</p>
              </Link>
          {/* </li> <li className="nav-item">










          <Link to="/SevenUpGamePlayHistory" className="nav-link">
                <i className="fas fa-address-book nav-icon"></i>
                <p>SevenUpGameHistory</p>
              </Link>
          </li> <li className="nav-item"> */}
<Link to="/FunTargetGamePlayHistory" className="nav-link">
      <i className="fas fa-address-book nav-icon"></i>
      <p>FunTargetGameHistory</p>
    </Link>
</li> <li className="nav-item">

<Link to="/TripleChanceGamePlayHistory" className="nav-link">
      <i className="fas fa-address-book nav-icon"></i>
      <p>TripleChanceGameHistory</p>
    </Link>
</li> 











<li className="nav-item">
              <Link to="/ShowCurrentBet" className="nav-link">
                <i className="fa-solid fa-users nav-icon" />
                <p> ShowCurrentBet </p>
              </Link>
            </li>

















































             <li className="nav-header">Transcatins Report</li>
 
            {/*<li className="nav-item">
              <Link to="/userWithdrawRequest" className="nav-link">
                <i className="fa-solid fa-arrow-right-arrow-left nav-icon" />
                <p>Withdraw Request</p>
              </Link>
        </li>*/}
            <li className="nav-item">
              <Link to="/Transactions" className="nav-link">
                <i className="fa-solid fa-arrow-right-arrow-left nav-icon" />
                <p>Transactions Records</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/DailyStatuss" className="nav-link">
                <i className="fa-solid fa-arrow-right-arrow-left nav-icon" />
                <p>Daily Status</p>
              </Link>
            </li>


            {/*<li className="nav-header">Users </li>
            <li className="nav-item">
              <Link to="/UsersList" className="nav-link">
                <i class="fa-solid fa-list nav-icon"></i>
                <p>Users History</p>
              </Link>
      </li>*/}
 <li className="nav-header">Point Report</li>

 <li className="nav-item">
              <Link to="/PointTransfer" className="nav-link">
                <i className="fa-solid fa-arrow-right-arrow-left nav-icon" />
                <p> Point Transferred</p>
              </Link>
            </li>
 <li className="nav-item">
              <Link to="/Transferabled" className="nav-link">
                <i className="fa-solid fa-arrow-right-arrow-left nav-icon" />
                <p>Transferable Point</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Receivabled" className="nav-link">
                <i className="fa-solid fa-arrow-right-arrow-left nav-icon" />
                <p>Receivable Point</p>
              </Link>
            </li>
           
           

            <li className="nav-item">
              <Link to="/PointCancell" className="nav-link">
                <i className="fa-solid fa-arrow-right-arrow-left nav-icon" />
                <p> Point Cancel</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/PointReject" className="nav-link">
                <i className="fa-solid fa-arrow-right-arrow-left nav-icon" />
                <p>  PointRejected</p>
              </Link>
            </li>

            


            <li className="nav-item">
              <Link to="/PointReceive" className="nav-link">
                <i className="fa-solid fa-arrow-right-arrow-left nav-icon" />
                <p> Point Received</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/GameReports" className="nav-link">
                <i className="fa-solid fa-arrow-right-arrow-left nav-icon" />
                <p> Game Report</p>
              </Link>
            </li>





            
            <li className="nav-header">User Settings</li>
            <li className="nav-item">
              <Link to="/changepassword" className="nav-link">
                <i className="fa-solid fa-key nav-icon"></i>
                <p>Change Password</p>
              </Link>
          </li> 
          </ul>          
        </nav>
      </div>
    </aside>
          );    
}
export default AppSideber;
