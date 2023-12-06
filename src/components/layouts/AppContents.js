import React from 'react'
import { BrowserRouter as Redirect, Switch, Route } from 'react-router-dom'
 
import Home from '../../views/Dashboard/Home';

import ViewMasterId from '../../views/agents/ViewMasterId';

import ViewSuperMaster from '../../views/Super/ViewSuperMaster';
import ViewState from '../../views/Super/ViewState';
import ViewCity from '../../views/Super/ViewCity';



import AddMasterId from '../../views/agents/AddMasterId';
import AddSuperMaster from '../../views/Super/AddSuperMaster';
import AddState from '../../views/Super/AddState';
import AddCity from '../../views/Super/AddCity';
import AddMain from '../../views/Super/AddMain';

import ViewMain from '../../views/Super/ViewMain';

import AddStateMaster from '../../views/agents/AddStateMaster';
import AddCityMaster from '../../views/agents/AddCityMaster';
import AddMainMaster from '../../views/agents/AddMainMaster';

import ViewMainMaster from '../../views/agents/ViewMainMaster';

import ViewstateMaster from '../../views/agents/ViewstateMaster';
import ViewCityMaster from '../../views/agents/ViewCityMaster';

import AddNewPlayer from '../../views/players/AddNewPlayer';
import PlayersList from '../../views/players/PlayersList';
import PointSettings from '../../views/points/PointSettings';
import TransactionReport from '../../views/points/TransactionReport';
import PointTransferred from '../../views/points/PointTransferredSuper';
import PointReceived from '../../views/points/PointReceived';
import PointCancel from '../../views/points/PointCancel';
import PointRejected from '../../views/points/PointRejected';
import Transferable from '../../views/points/Transferable';
import Receivable from '../../views/points/Receivable';
import ReceivableExcel from '../../views/points/ReceivableExcel';
import TransferableExcel from '../../views/points/TransferableExcel';
import ReportExcel from '../../views/points/ReportExcel';

import JeetoJokerGame from '../../views/gamebet/JeetoJokerGame';
import ShowCurrentBet from '../../views/gamebet/ShowCurrentBet';
import DoubleChanceGame from '../../views/gamebet/DoubleChanceGame';
import CardsGame from '../../views/gamebet/CardsGame';
import TripleChanceGames from '../../views/gamebet/TripleChanceGames';



import PointTransferredMaster from '../../views/points/PointTransferredMaster';
import PointTransferredPlayer from '../../views/points/PointTransferredPlayer';
import PointTransferredSuper from '../../views/points/PointTransferredSuper';
 


import GameReport from '../../views/points/GameReport';

import DailyStatus from '../../views/points/DailyStatus';

import GameHistory from '../../views/game/GameHistory';
import AndarBaharGameHistory from '../../views/game/AndarBaharGameHistory';
import RoulletGameHistory from '../../views/game/RoulletGameHistory';
import FunTargetGameHistory from '../../views/game/FunTargetGameHistory';
import TripleChanceGameHistory from '../../views/game/TripleChanceGameHistory';
import SevenUpDownGameHistory from '../../views/game/SevenUpDownGameHistory';



import PlayerHistory from '../../views/players/PlayerHistrory';
//import ShowCurrentBet from '../../views/gamebet/ShowCurrentBet';
import ChangePassword from '../../views/settings/ChangePassword';
import ChangeUserPassword from '../../views/settings/ChangeUserPassword';
import TransactionHistory from '../../views/payments/TransactionHistory';
import WithdrawRequest from '../../views/payments/WithdrawRequest';
import Cards from '../../views/Cards/Cards'
import UsersList from '../../views/Users/UsersList'

export default function AppContents() {
  return (
    <section className="content">
    <div className="container-fluid">
        <Route path="/" exact component={Home} /> 

        <Route path="/SuperMaster" exact component={ViewSuperMaster} /> 
        <Route path="/Superviewstate" exact component={ViewState} /> 
        <Route path="/Superviewcity" exact component={ViewCity} /> 
        <Route path="/Superviewmain" exact component={ViewMain} /> 

        <Route path="/viewstateM" exact component={ViewstateMaster} /> 
        <Route path="/viewcityM" exact component={ViewCityMaster} /> 
        <Route path="/viewmainM" exact component={ViewMainMaster} /> 


        <Route path="/AddMaster" exact component={AddSuperMaster} /> 
        <Route path="/AddSuperState" exact component={AddState} />
        <Route path="/AddSuperCity" exact component={AddCity} />
        <Route path="/AddSuperMain" exact component={AddMain} />

        <Route path="/AddMasterState" exact component={AddStateMaster} />
        <Route path="/AddMasterCity" exact component={AddCityMaster} />
        <Route path="/AddMasterMain" exact component={AddMainMaster} />

          

        
        <Route path="/MasterId" exact component={ViewMasterId} /> 
        <Route path="/AdMasterId" exact component={AddMasterId} /> 
        <Route path="/PlayersList" exact component={PlayersList} /> 
        <Route path="/AddnewPlayer" exact component={AddNewPlayer} /> 
        <Route path="/Transactions" exact component={TransactionHistory} /> 


        <Route path="/PointTransfer" exact component={PointTransferred} /> 
        <Route path="/PointReceive" exact component={PointReceived} /> 
        <Route path="/PointReject" exact component={PointRejected} /> 
        <Route path="/PointCancell" exact component={PointCancel} /> 
        <Route path="/Receivabled" exact component={Receivable} /> 
        <Route path="/Transferabled" exact component={Transferable} /> 

        

        <Route path="/GameReports" exact component={GameReport} /> 
        <Route path="/DailyStatuss" exact component={DailyStatus} /> 


         <Route path="/pointPlayer" exact component={PointTransferredPlayer} /> 
        <Route path="/pointSuperMaster" exact component={PointTransferredSuper} /> 
        <Route path="/pointMaster" exact component={PointTransferredMaster} /> 
 




        <Route path="/userWithdrawRequest" exact component={WithdrawRequest} /> 
        <Route path="/PlayersHistrory" exact component={PlayerHistory} /> 
        <Route path="/GamePlayHistory" exact component={GameHistory} /> 
        <Route path="/AndarBaharGamePlayHistory" exact component={AndarBaharGameHistory} />
        <Route path="/RoulletGamePlayHistory" exact component={RoulletGameHistory} />
        <Route path="/FunTargetGamePlayHistory" exact component={FunTargetGameHistory} /> 
        <Route path="/TripleChanceGamePlayHistory" exact component={TripleChanceGameHistory} /> 
        <Route path="/SevenUpGamePlayHistory" exact component={SevenUpDownGameHistory} /> 





        <Route path="/ShowCurrentBet" exact component={ShowCurrentBet} /> 
        <Route path="/JeetoJokerGame" exact component={JeetoJokerGame} /> 
        <Route path="/16CardsGame" exact component={CardsGame} /> 
        <Route path="/SpinWinGame" exact component={DoubleChanceGame} /> 
        <Route path="/AndarbaharGame" exact component={TripleChanceGames} /> 
        
        <Route path="/ReportX" exact component={ReportExcel} />
        <Route path="/TransferableX" exact component={TransferableExcel} />
        <Route path="/ReceivableX" exact component={ReceivableExcel} />

        







        <Route path="/ChangePassword" exact component={ChangePassword} /> 
        <Route path="/ResetUserPassword" exact component={ChangeUserPassword} /> 
        <Route path="/cards" exact component={Cards} /> 
        <Route path="/UsersList" exact component={UsersList} /> 
        </div>
    </section>
  )
}
