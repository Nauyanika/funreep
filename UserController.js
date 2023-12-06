const bcrypt = require("bcrypt");
//const check = require('../validation/CheckValidation')
const conn = require("../config/db");
const moment = require("moment");
//const {authToken} =require('../middleware/getToken')
// User login
var nodemailer = require("nodemailer");

//list of getPlayerDAta
const getPlayerData = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM  users`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const getPlayerIdData = async (req, res) => {
  var playerid = "";
  const sql2 = `SELECT COUNT(*) as totalcount  FROM users`;
  const allusers = await conn.query(sql2);
  console.log("allusers:", allusers[0].totalcount);
  if (allusers[0].totalcount >= 0 && allusers[0].totalcount <= 9) {
    //playerid = "GK0000" + allusers[0].totalcount;
    playerid = "GK0010000" + allusers[0].totalcount;

  } else if (
    allusers[0].totalcount / 10 >= 1 &&
    allusers[0].totalcount / 10 <= 9
  ) {
    //playerid = "GK000" + allusers[0].totalcount;
    playerid = "GK001000" + allusers[0].totalcount;

  } else if (
    allusers[0].totalcount / 10 >= 10 &&
    allusers[0].totalcount / 10 <= 99
  ) {
    //playerid = "GK00" + allusers[0].totalcount;
    playerid = "GK00100" + allusers[0].totalcount;

  } else if (
    allusers[0].totalcount / 10 >= 100 &&
    allusers[0].totalcount / 10 <= 999
  ) {
   // playerid = "GK0" + allusers[0].totalcount;
   playerid = "GK0010" + allusers[0].totalcount;

  } else if (
    allusers[0].totalcount / 10 >= 1000 &&
    allusers[0].totalcount / 10 <= 9999
  ) {
   // playerid = "GK" + allusers[0].totalcount;
   playerid = "GK001" + allusers[0].totalcount;

  }
  console.log("playerId", playerid);
  statusCode = 200;
  message = "success";
  data = playerid;

  const responseData = {
    status: statusCode,
    message,
    data,
  };
  res.send(responseData);
};

//list of Super Master
const getSuperMasterData = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM  supermaster`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

//MasterId

const getMasterIdData = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM  masterid`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const getPlayerHistoryData = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT user.id,user.user_id,user.username,game_name.game_name FROM  user left join round_report on user.user_id=round_report.player_id left join game_name on round_report.game=game_name.id`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};
const AndarBaharGamePlayHistoryData = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    //let sql = `SELECT * FROM game_record_andarbhar ORDER BY created DESC  `;
    let sql = `SELECT * FROM andarbahar_playerdetails ORDER BY playedtime DESC  `;

    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const RoulletGamePlayHistoryData = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    //let sql = `SELECT * FROM game_record_roulette ORDER BY created DESC`;
    let sql = `SELECT * FROM roulette_playerdetails ORDER BY playedtime DESC  `;

    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};
const FunTargetGamePlayHistoryData = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    //let sql = `SELECT * FROM game_record_funtarget ORDER BY created DESC `;
    let sql = `SELECT * FROM funtarget_playerdetail ORDER BY playedtime DESC  `;

    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};
const TripleChanceGamePlayHistoryData = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
   // let sql = `SELECT * FROM game_record_triplechance ORDER BY created DESC`;
   let sql = `SELECT * FROM triplechance_playerdetail ORDER BY playedtime DESC  `;

    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const SevenUpGamePlayHistoryData = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    //let sql = `SELECT * FROM game_record_sevenup ORDER BY created DESC`;
    let sql = `SELECT * FROM seven_playerdetail ORDER BY playedtime DESC  `;

    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};
const Transaction = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM transactions ORDER BY created DESC`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const PointTransfer = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM pointtransferred `;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const PointReceive = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM pointtransferred `;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const PointCancel = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM pointcanel `;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const PointRejected = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM pointreject `;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};
const PointHistory = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM point_history `;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const GameReport = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM join_game `;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const DailyStatus = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM daily_status`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

//Playerpointhistory
const getPlayerPointHistory = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT user.id,user.user_id,user.username,game_record_dragon.game_id,game_record_dragon.created_at FROM user left join game_record_dragon on user.user_id=game_record_dragon.user_id`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agenot found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

/* //GamesHistory------------------
const getDoubleChanceHistory= async (req, res) => {
    let message = null
    let statusCode = 400  
    let data;
    try { 
           // let sql = `SELECT * FROM round_report WHERE game=1 and outer_win=NULL and inner_win=NULL `;
           let sql = `SELECT * FROM round_report WHERE game=1 `;

            const agent = await conn.query(sql)
            if(agent.length>0){ 
                statusCode = 200
                message    = "success" 
                data = agent
            }else{
                statusCode = 404
                message    = "NOT found"
            } 
            const responseData = {
                status: statusCode,
                message, 
                data
            }
            res.send(responseData)
     
    } catch (error) {
        res.status(500).send('Database error 1')
    }
}
const getJeetoJokerHistory= async (req, res) => {
    let message = null
    let statusCode = 400  
    try { 
            let sql = `SELECT * FROM round_report WHERE game=2 `;
            const agent = await conn.query(sql)
            if(agent.length>0){ 
                statusCode = 200
                message    = "success" 
                data = agent
            }else{
                statusCode = 404
                message    = "Agent found"
            } 
            const responseData = {
                status: statusCode,
                message, 
                data
            }
            res.send(responseData)
     
    } catch (error) {
        res.status(500).send('Database error 1')
    }
}
const get16CardsHistory= async (req, res) => {
    let message = null
    let statusCode = 400  
    try { 
            let sql = `SELECT * FROM round_report WHERE game=3`;
            const agent = await conn.query(sql)
            if(agent.length>0){ 
                statusCode = 200
                message    = "success" 
                data = agent
            }else{
                statusCode = 404
                message    = "Agent found"
            } 
            const responseData = {
                status: statusCode,
                message, 
                data
            }
            res.send(responseData)
     
    } catch (error) {
        res.status(500).send('Database error 1')
    }
}
const getSpinGameHistory= async (req, res) => {
    let message = null
    let statusCode = 400  
    try { 
            let sql = `SELECT * FROM round_report WHERE game=4 `;
            const agent = await conn.query(sql)
            if(agent.length>0){ 
                statusCode = 200
                message    = "success" 
                data = agent
            }else{
                statusCode = 404
                message    = "Agent found"
            } 
            const responseData = {
                status: statusCode,
                message, 
                data
            }
            res.send(responseData)
     
    } catch (error) {
        res.status(500).send('Database error 1')
    }
}

 */

const sendPoints = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  try {
    console.log(req.body, "Send data");
    const { role_id, user_id, distributor_id, stokez_id, points, passcode } =
      req.body;
    switch (role_id) {
      case 4:
        sql = `SELECT * FROM stokez WHERE LOWER(id)= ? limit ?`;
        responseData = await conn.query(sql, [stokez_id, 1]);
        if (responseData.length > 0) {
          sql = `SELECT * FROM stokez_point WHERE LOWER(stokez_id)= ? limit ?`;
          responseData = await conn.query(sql, [stokez_id, 1]);
          if (responseData.length > 0) {
            const tpoints = parseInt(points) + parseInt(responseData[0].point);
            sql = "UPDATE stokez_point SET point= ? WHERE stokez_id=?";
            const userss = await conn.query(sql, [tpoints, stokez_id]);
            if (userss) {
              let formData = {
                stokez_id: stokez_id,
                point: points,
              };
              sql = "INSERT INTO  stokez_point_history SET ?";
              const userss = await conn.query(sql, formData);
              statusCode = 200;
              message = "Points updated";
            } else {
              statusCode = 500;
              message = "Something went wrong! database error";
            }
          } else {
            let formData = {
              stokez_id: stokez_id,
              point: points,
            };
            sql = "INSERT INTO  stokez_point SET ?";
            const userss = await conn.query(sql, formData);
            if (userss) {
              statusCode = 200;
              message = "Points updated";
            } else {
              statusCode = 500;
              message = "Something went wrong! database error";
            }
          }
        } else {
          message = "Invalid stokez id";
          statusCode = 404;
        }
        break;
      case 2:
        break;
      case 3:
        break;

      default:
        break;
    }

    const responseData = {
      status: statusCode,
      message,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

//transfer  stokez point
const sendPointstoSuperMaster = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  try {
    const { id, points } = req.body;
    console.log(id,points)

    let formData = {
      id: id,
      point: points,
    };
    let formData1 = {
      receiver: id,
      sender: "Company",
      point: points,
    };

    if (points) {
      sql = `SELECT * FROM supermaster WHERE full_name = ? limit ?`;
      responseData = await conn.query(sql, [id, 1]);
      if (responseData.length > 0) {
        console.log(responseData, "responseData");
        statusCode = 404;
        let stokezPointId = responseData[0].id;
        const tpoints = parseInt(points) + parseInt(responseData[0].point);

        sql = "UPDATE supermaster SET ? WHERE full_name=?";
        updateResponse = await conn.query(sql, [{ point: tpoints }, id]);
        if (updateResponse) {
          // statusCode = 200
          // message    = "Points updated"

          sql = "INSERT INTO  point_history SET ?";
          const userss = await conn.query(sql, formData1);
          if (userss) {
            statusCode = 200;
            message = "Points updated";
          } else {
            statusCode = 500;
            message = "Something went wrong! database error";
          }
        } else {
          statusCode = 500;
          message = "Something went wrong! database error";
        }
      }
    } else {
      statusCode = 404;
      message = "Points required";
    }

    const responseDatajson = {
      status: statusCode,
      message,
    };
    res.send(responseDatajson);
  } catch (error) {
    console.log(error)

    res.status(500).send("Database error");
  }
};

//transfer agent point
const sendPointstoMasterId = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  try {
    const { id, points } = req.body;
    console.log(id,points)

    let formData = {
      id: id,
      point: points,
    };
    let formData1 = {
      receiver: id,
      sender: "Company",
      point: points,
    };

    if (points) {
      sql = `SELECT * FROM masterid WHERE full_name = ? limit ?`;
      responseData = await conn.query(sql, [id, 1]);
      if (responseData.length > 0) {
        console.log(responseData, "responseData");
        statusCode = 404;
        let stokezPointId = responseData[0].id;
        const tpoints = parseInt(points) + parseInt(responseData[0].point);

        sql = "UPDATE masterid SET ? WHERE full_name=?";
        updateResponse = await conn.query(sql, [{ point: tpoints }, id]);
        if (updateResponse) {
          //statusCode = 200
          //message    = "Points updated"
          sql = "INSERT INTO  point_history SET ?";
          const userss = await conn.query(sql, formData1);
          if (userss) {
            statusCode = 200;
            message = "Points updated";
          } else {
            statusCode = 500;
            message = "Something went wrong! database error";
          }
        } else {
          statusCode = 500;
          message = "Something went wrong! database error";
        }
      }
    } else {
      statusCode = 404;
      message = "Points required";
    }

    const responseDatajson = {
      status: statusCode,
      message,
    };
    res.send(responseDatajson);
  } catch (error) {
    console.log(error)
    res.status(500).send("Database error");
  }
};
//transfer player point
const sendPointstoPlayer = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  try {
    const { id, points } = req.body;

    let formData = {
      id: id,
      point: points,
    };
    let formData1 = {
      receiver: id,
      sender: "Company",
      point: points,
    };

    if (points) {
      sql = `SELECT * FROM users WHERE email = ? limit ?`;
      responseData = await conn.query(sql, [id, 1]);
      if (responseData.length > 0) {
        console.log(responseData, "responseData");
        statusCode = 404;
        let stokezPointId = responseData[0].id;
        const tpoints = parseInt(points) + parseInt(responseData[0].point);

        sql = "UPDATE users SET ? WHERE email=?";
        updateResponse = await conn.query(sql, [{ point: tpoints }, id]);
        if (updateResponse) {
          //statusCode = 200
          // message    = "Points updated"
          sql = "INSERT INTO  point_history SET ?";
          const userss = await conn.query(sql, formData1);
          if (userss) {
            statusCode = 200;
            message = "Points updated";
          } else {
            statusCode = 500;
            message = "Something went wrong! database error";
          }
        } else {
          statusCode = 500;
          message = "Something went wrong! database error";
        }
      }
    } else {
      statusCode = 404;
      message = "Points required";
    }

    const responseDatajson = {
      status: statusCode,
      message,
    };
    res.send(responseDatajson);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const changePercentage = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  try {
    const { slots, userpoints, adminpoints } = req.body;

    let formData = {
      name: slots,
      percentage: adminpoints,
    };

    if (adminpoints) {
      sql = "UPDATE usershareprofit SET ? WHERE name=?";
      updateResponse = await conn.query(sql, [formData, slots]);
      if (updateResponse) {
        statusCode = 200;
        message = " Profit Points updated";
      } else {
        statusCode = 500;
        message = "Something went wrong! database error";
      }
    }

    const responseDatajson = {
      status: statusCode,
      message,
    };
    res.send(responseDatajson);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const UserShare = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM usershareprofit `;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};









const transferPoint = async (req, res) => {
  let message = null;
  let statusCode = 400;
  var data = {};
  const { emailId } = req.body;
  try {
    let sql = `SELECT * FROM  point_history where sender=?`;
    const agent = await conn.query(sql, emailId);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";

      var data1 = {};
      var transferRecordArray=[]

      var transferRecord ;
      for(i=0;i<agent.length;i++){
        transferRecord={}
   
      transferRecord.from = agent[0].receiver;
      transferRecord.to = agent[0].sender;
      transferRecord.amount = agent[0].point;
      transferRecord.date = agent[0].createdat;
      transferRecordArray.push(transferRecord)

      }
data1.transferRecord=transferRecordArray
      data = data1;
    } else {
      statusCode = 404;
      message = "detail not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};
const onbalance = async (req, res) => {
  let message = null;
  let statusCode = 400;
  const email = req.body.email;
  let data;
  try {
    let sql = `SELECT point FROM users where email =? `;
    const agent = await conn.query(sql, email);

    if (agent.length > 0) {
      
        statusCode = 200;
        message = "true";
       var data1={}
       data1.balance=agent[0].point
      data = data1;
    } else {
      statusCode = 404;
      message = "user does not exist";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    console.log("error-------",error)

    res.status(500).send("Database error");
  }
};

const SetplayerOnline = async (req, res) => {
  let message = null;
  let statusCode = 400;
  const email = req.body.email;
  let data;
  try {
    let sql = "UPDATE users SET active_player=1 WHERE email=?"
    const agent = await conn.query(sql, email);
console.log(email,"email")
  //  if (agent.length > 0) {
      
        statusCode = 200;
        message = "Player is active";
      /*  var data1={}
       data1.activePlayer=agent[0].active_player
      data = data1;
    *//*  } else {
      statusCode = 404;
      message = "user does not exist";
    }
    */ const responseData = {
      status: statusCode,
      message,
     // data,
    };
    res.send(responseData);
  } catch (error) {
    console.log("error-------",error)

    res.status(500).send("Database error");
  }
};

const SetplayerOffline = async (req, res) => {
  let message = null;
  let statusCode = 400;
  const email = req.body.email;
  let data;
  try {
    let sql = "UPDATE users SET active_player=0 WHERE email=?"

    const agent = await conn.query(sql, email);
    
   // if (agent.length > 0) {
      
        statusCode = 200;
        message = "Player is inactive";
      /*  var data1={}
       data1.activePlayer=agent[0].active_player
*/
     // data = data1;
   /*  } else {
      statusCode = 404;
      message = "user does not exist";
    }
    */ const responseData = {
      status: statusCode,
      message,
     // data,
    };
    res.send(responseData);
  } catch (error) {
    console.log("error-------",error)

    res.status(500).send("Database error");
  }
};

const CheckPlayer = async (req, res) => {
  let message = null;
  let statusCode = 400;
  const email = req.body.email;
  let player=false
  let data;
  try {
    let sql = `SELECT * FROM users where email =? and active_player=1`;
    const agent = await conn.query(sql, email);

    if (agent.length > 0) {
      
        statusCode = 200;
        message = "player is active in game";
       player=true
    } else {
      statusCode = 404;
      message = "player is inactive in game";
    }
    const responseData = {
      status: statusCode,
      message,
      player,
    };
    res.send(responseData);
  } catch (error) {
    console.log("error-------",error)

    res.status(500).send("Database error");
  }
};

const updateUser = async (req, res) => {
  try {
    const { id, first_name, password } = req.body;

    // Check if the user exists
    let sql = "SELECT * FROM users WHERE id = ?";
    let users = await conn.query(sql, [id]);
    if (users.length === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    // Update the user data
    sql = "UPDATE users SET first_name = ?, password = ? WHERE id = ?";
    await conn.query(sql, [first_name, password, id]);

    // Return success response
    return res.status(200).send({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Something went wrong" });
  }
};

const updateSuperMaster = async (req, res) => {
  try {
    const { id, full_name, password } = req.body;

    // Check if the supermaster exists
    let sql = "SELECT * FROM supermaster WHERE id = ?";
    let supermasters = await conn.query(sql, [id]);
    if (supermasters.length === 0) {
      return res.status(404).send({ message: "Supermaster not found" });
    }

    // Update the supermaster data
    sql = "UPDATE supermaster SET full_name = ?, password = ? WHERE id = ?";
    await conn.query(sql, [full_name, password, id]);

    // Return success response
    return res.status(200).send({ message: "Supermaster updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Something went wrong" });
  }
};

const updateMasterId = async (req, res) => {
  try {
    const { id, full_name, password } = req.body;

    // Check if the master id exists
    let sql = "SELECT * FROM masterid WHERE id = ?";
    let masterIds = await conn.query(sql, [id]);
    if (masterIds.length === 0) {
      return res.status(404).send({ message: "Master ID not found" });
    }

    // Update the master id data
    sql = "UPDATE masterid SET full_name = ?, password = ? WHERE id = ?";
    await conn.query(sql, [full_name, password, id]);

    // Return success response
    return res.status(200).send({ message: "Master ID updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Something went wrong" });
  }
};
const Adminfuntarget = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  try {
    const {value} = req.body;
console.log("value",value)
    
      sql = "UPDATE admin_funtarget SET value=?";
      updateResponse = await conn.query(sql,[value]);
      if (updateResponse) {
        statusCode = 200;
        message = " Profit Points updated";
      } else {
        statusCode = 500;
        message = "Something went wrong! database error";
      }

    const responseDatajson = {
      status: statusCode,
      message,
    };
    res.send(responseDatajson);
  } catch (error) {
    res.status(500).send("Database error");
  }
};


const getAdminfuntarget = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  let data;
  try {
    
      sql = "select * from admin_funtarget ";
      updateResponse = await conn.query(sql);
      if (updateResponse.length>0) {
   // console.log("updateResponse",updateResponse)
        data=updateResponse[0]
        statusCode = 200;
        message = " Points updated";
      } else {
        statusCode = 500;
        message = "Something went wrong! database error";
      }

    const responseDatajson = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseDatajson);
  } catch (error) {
    console.log("error",error)
    res.status(500).send("Database error");
  }
};

const Admin7up = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  try {
    const {value1,value2} = req.body;
// console.log("value",value1)
    
      sql = "UPDATE admin_7up SET value1=?, value2=?";
      updateResponse = await conn.query(sql,[value1,value2]);
      if (updateResponse) {
    console.log("updateResponse",updateResponse)

        statusCode = 200;
        message = " Points updated";
      } else {
        statusCode = 500;
        message = "Something went wrong! database error";
      }

    const responseDatajson = {
      status: statusCode,
      message,
    };
    res.send(responseDatajson);
  } catch (error) {
    console.log("error",error)
    res.status(500).send("Database error");
  }
};

const getAdmin7up = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  let data;
  try {
    
      sql = "select * from admin_7up ";
      updateResponse = await conn.query(sql);
      if (updateResponse.length>0) {
   // console.log("updateResponse",updateResponse)
        data=updateResponse[0]
        statusCode = 200;
        message = " Points updated";
      } else {
        statusCode = 500;
        message = "Something went wrong! database error";
      }

    const responseDatajson = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseDatajson);
  } catch (error) {
    console.log("error",error)
    res.status(500).send("Database error");
  }
};

const Admintriplechance = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  try {
    const {value1,value2,value3} = req.body;
console.log("value",value1)

    
      sql = "UPDATE admin_triplechance SET  value1=?,value2=?,value3=?";
      updateResponse = await conn.query(sql,[value1,value2,value3]);
      if (updateResponse) {
        statusCode = 200;
        message = " Profit Points updated";
      } else {
        statusCode = 500;
        message = "Something went wrong! database error";
      }

    const responseDatajson = {
      status: statusCode,
      message,
    };
    res.send(responseDatajson);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const getAdmintriplechance = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  let data;
  try {
    
      sql = "select * from admin_triplechance ";
      updateResponse = await conn.query(sql);
      if (updateResponse.length>0) {
   // console.log("updateResponse",updateResponse)
        data=updateResponse[0]
        statusCode = 200;
        message = " Points updated";
      } else {
        statusCode = 500;
        message = "Something went wrong! database error";
      }

    const responseDatajson = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseDatajson);
  } catch (error) {
    console.log("error",error)
    res.status(500).send("Database error");
  }
};

const Adminroulette = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  try {
    const {value} = req.body;
console.log("value",value)
    
      sql = "UPDATE admin_roulette SET  value=?";
      updateResponse = await conn.query(sql,[value]);
      if (updateResponse) {
        statusCode = 200;
        message = " Profit Points updated";
      } else {
        statusCode = 500;
        message = "Something went wrong! database error";
      }

    const responseDatajson = {
      status: statusCode,
      message,
    };
    res.send(responseDatajson);
  } catch (error) {
    res.status(500).send("Database error");
  }
};
const getAdminroulette = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  let data;
  try {
    
      sql = "select * from admin_roulette ";
      updateResponse = await conn.query(sql);
      if (updateResponse.length>0) {
   // console.log("updateResponse",updateResponse)
        data=updateResponse[0]
        statusCode = 200;
        message = " Points updated";
      } else {
        statusCode = 500;
        message = "Something went wrong! database error";
      }

    const responseDatajson = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseDatajson);
  } catch (error) {
    console.log("error",error)
    res.status(500).send("Database error");
  }
};


const Adminandarbahar = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  try {
    const {value} = req.body;
console.log("value",value)
    
      sql = "UPDATE admin_andarbahar SET  value=?";
      updateResponse = await conn.query(sql,[value]);
      if (updateResponse) {
        statusCode = 200;
        message = " Profit Points updated";
      } else {
        statusCode = 500;
        message = "Something went wrong! database error";
      }

    const responseDatajson = {
      status: statusCode,
      message,
    };
    res.send(responseDatajson);
  } catch (error) {
    res.status(500).send("Database error");
  }
};
const getAdminandarbahar = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  let data;
  try {
    const {value} = req.body;
console.log("value",value)
    
      sql = "select * from admin_andarbahar ";
      updateResponse = await conn.query(sql);
      if (updateResponse.length>0) {
        data=updateResponse[0]
        statusCode = 200;
        message = " Profit Points updated";
      } else {
        statusCode = 500;
        message = "Something went wrong! database error";
      }

    const responseDatajson = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseDatajson);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const gamerunning = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  let data;
  try {
    
      sql = "select * from game_running order by playerTime desc limit 20 ";
      updateResponse = await conn.query(sql);
      if (updateResponse.length>0) {
   // console.log("updateResponse",updateResponse)
        data=updateResponse
        statusCode = 200;
        message = "  updated";
      } else {
        statusCode = 500;
        message = "Something went wrong! database error";
      }

    const responseDatajson = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseDatajson);
  } catch (error) {
    console.log("error",error)
    res.status(500).send("Database error");
  }
};


const gamerunningfuntarget = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  let data;
  try {
    
      sql = "select * from game_runningfuntarget order by playedTime desc limit 20 ";
      updateResponse = await conn.query(sql);
      if (updateResponse.length>0) {
   // console.log("updateResponse",updateResponse)
        data=updateResponse
        statusCode = 200;
        message = " Points updated";
      } else {
        statusCode = 500;
        message = "Something went wrong! database error";
      }

    const responseDatajson = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseDatajson);
  } catch (error) {
    console.log("error",error)
    res.status(500).send("Database error");
  }
};

const gamerunningandarbahar = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  let data;
  try {
    
      sql = "select * from game_running_andarbahar order by playedTime desc limit 20";
      updateResponse = await conn.query(sql);
      if (updateResponse.length>0) {
   // console.log("updateResponse",updateResponse)
        data=updateResponse
        statusCode = 200;
        message = " Points updated";
      } else {
        statusCode = 500;
        message = "Something went wrong! database error";
      }

    const responseDatajson = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseDatajson);
  } catch (error) {
    console.log("error",error)
    res.status(500).send("Database error");
  }
};

const gamerunningroulette = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  let data;
  try {
    
      sql = "select * from game_running_roulette order by playedTime desc limit 20";
      updateResponse = await conn.query(sql);
      if (updateResponse.length>0) {
   // console.log("updateResponse",updateResponse)
        data=updateResponse
        statusCode = 200;
        message = " Points updated";
      } else {
        statusCode = 500;
        message = "Something went wrong! database error";
      }

    const responseDatajson = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseDatajson);
  } catch (error) {
    console.log("error",error)
    res.status(500).send("Database error");
  }
};

const gamerunningtriplechance = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  let data;
  try {
    
      sql = "select * from game_running_triplechance order by playedTime desc limit 20";
      updateResponse = await conn.query(sql);
      if (updateResponse.length>0) {
   // console.log("updateResponse",updateResponse)
        data=updateResponse
        statusCode = 200;
        message = " Points updated";
      } else {
        statusCode = 500;
        message = "Something went wrong! database error";
      }

    const responseDatajson = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseDatajson);
  } catch (error) {
    console.log("error",error)
    res.status(500).send("Database error");
  }
};

const Winamount = async (req, res) => {
  let message = null;
  let statusCode = 400;
  const{playerId,game_id}  = req.body;
  let data;
  try {
    let sql = `SELECT * FROM winpoint_details where playerId =? AND game_id=?`;
    const agent = await conn.query(sql, [playerId,game_id]);

    if (agent.length > 0) {
      
        statusCode = 200;
        message = "true";
       var data1={}
       data1.Winamount=agent[0].point
      data = data1;
    } else {
      statusCode = 404;
      message = "user does not exist";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    console.log("error-------",error)

    res.status(500).send("Database error");
  }
};
const DeletePreviousWinamount = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  try {
    const { playerId, game_id } = req.body;

      sql = `SELECT * FROM winpoint_details WHERE playerId = ? AND game_id=? `;
      responseData = await conn.query(sql, [playerId,game_id]);
      if (responseData.length > 0) {
       // console.log(responseData, "responseData");
        statusCode = 404;
        let stokezPointId = responseData[0].playerId;
        const points = parseInt(responseData[0].point);
        console.log(points, "points");

        sql = `SELECT * FROM users WHERE email = ?  `;
      let responseData1 = await conn.query(sql, [playerId]);
      if (responseData1.length > 0) {
        //console.log(responseData, "responseData");
        statusCode = 406;
        let p1 = responseData1[0].email;
        const tpoints1 = parseInt(responseData1[0].point);
        console.log(tpoints1, "tpoints1");


        sql = "UPDATE users SET ? WHERE email=?";
        updateResponse = await conn.query(sql, [{ point:(parseInt(responseData[0].point)+parseInt(responseData1[0].point)) }, playerId]);
       if (updateResponse) {
       // console.log(updateResponse, "-----------updateResponse");

     //  sql = `Delete FROM winpoint_details where playerId =? AND game_id=?`;
     sql = `UPDATE winpoint_details SET point=?  where playerId =? AND game_id=?`;

          const userss = await conn.query(sql, [0,playerId,game_id]);
           if (userss) {
            statusCode = 200;
            message = "user previous winamount detail is deleted successfully";
          } else {
            statusCode = 500;
            message = "Something went wrong! database error";
          }
        } 
      }
   
    }
    const responseDatajson = {
      status: statusCode,
      message,
    };
    res.send(responseDatajson);
  } catch (error) {
    console.log(error,"error")
    res.status(500).send("Database error");
  }
};











const jokerBetPlaced = async (req, res) => {
  const { playerId, betAmount } = req.body;
  const cards = generateRandomCards();
  // Insert the player's bet and cards into the database
  savePlayerData(playerId, betAmount, cards);
  res.json({
    status: 200,
    message: 'Bet is placed! Dealing cards...',
    data: {
      cards,
    },
  });
  function generateRandomCards() {
    const cards = [];
    for (let i = 0; i < 5; i++) {
      const rank = Math.floor(Math.random() * 13);
      const suit = Math.floor(Math.random() * 4);
      cards.push([rank, suit]);
    }
    return cards;
  }
  // function to save player data
  function savePlayerData(playerId, betAmount, cards) {
    const query = `INSERT INTO game_records_joker (playerId, betAmount, card1_rank, card1_suit, card2_rank, card2_suit, card3_rank, card3_suit, card4_rank, card4_suit, card5_rank, card5_suit)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      playerId,
      betAmount,
      cards[0][0], cards[0][1],
      cards[1][0], cards[1][1],
      cards[2][0], cards[2][1],
      cards[3][0], cards[3][1],
      cards[4][0], cards[4][1],
    ];
    conn.query(query, values, (err, results) => {
      if (err) {
        console.error('Error saving player data:', err);
      } else {
        console.log('Player data saved successfully');
      }
    });
  }
};





const jokerTakeAmount = async (req, res) => {
  const { playerId, updateBalance } = req.body;
  const fetchCreditsQuery = `SELECT credits FROM game_records_joker WHERE playerId = '${playerId}'`;
  conn.query(fetchCreditsQuery, (err, result) => {
    if (err) {
      console.error('Error fetching credits:', err);
      res.status(500).json({ status: 500, message: 'Error fetching credits' });
      return;
    }
    // Check if user exists
    if (result.length === 0) {
      res.status(404).json({ status: 404, message: 'User not found' });
      return;
    }
    const currentCredits = result[0].credits;
    const updatedCredits = currentCredits + parseInt(updateBalance);
    const updateCreditsQuery = `UPDATE game_records_joker SET credits = ${updatedCredits} WHERE playerId = '${playerId}'`;
    conn.query(updateCreditsQuery, (err) => {
      if (err) {
        console.error('Error updating credits:', err);
        res.status(500).json({ status: 500, message: 'Error updating credits' });
        return;
      }
      res.status(200).json({ status: 200, message: 'Credits added and fetched updated credits', credits: updatedCredits });
    });
  });
};






const jokerDoubleUp = async (req, res) => {
  const playerId = req.body.playerId;
  // Generate a random card rank and suit
  const rank = Math.floor(Math.random() * 13);
  const suit = Math.floor(Math.random() * 4);
  const card = [rank, suit];
  // Save the card in the database
  conn.query('INSERT INTO player_data (`playerId`, `rank`, `suit`) VALUES (?, ?, ?)', [playerId, rank, suit], (error, results, fields) => {
    if (error) {
      console.error('Error saving card:', error);
      res.status(500).json({ status: 'error', message: 'An error occurred while saving the card.' });
    } else {
      res.json({ status: 'success', message: 'Card saved successfully.', data: { doubleUp_card: card } });
    }
  });
};


function getwinamount(betamount1, betamount2, betamount3, betamount4, betamount4, betamount5, betamount6) {
  // Matrix 1
  const matrix1 = [
    [5, 1, 9, 25, 3],
    [8, 22, 10, 19, 7],
    [6, 18, 16, 11, 17],
    [24, 21, 14, 20, 13],
    [12, 23, 2, 4, 15]
  ];

  // Matrix 2
  const matrix2 = [
    [9, 24, 16, 4, 6],
    [13, 19, 14, 20, 25],
    [2, 18, 15, 12, 17],
    [1, 22, 11, 21, 8],
    [10, 7, 5, 23, 3]
  ];

  // Matrix 3
  const matrix3 = [
    [6, 7, 3, 24, 1],
    [23, 4, 12, 18, 2],
    [5, 19, 20, 16, 22],
    [11, 17, 9, 15, 25],
    [10, 13, 21, 4, 8]
  ];

  // Matrix 4
  const matrix4 = [
    [3, 7, 10, 4, 9],
    [24, 21, 18, 22, 8],
    [15, 14, 17, 11, 2],
    [13, 20, 12, 19, 23],
    [6, 25, 16, 1, 5]
  ];

  // Matrix 5
  const matrix5 = [
    [4, 6, 1, 23, 5],
    [25, 15, 3, 17, 13],
    [9, 19, 21, 12, 20],
    [10, 18, 16, 14, 8],
    [7, 24, 22, 2, 11]
  ];

  // Matrix 6
  const matrix6 = [
    [8, 23, 10, 13, 4],
    [2, 17, 16, 14, 24],
    [20, 12, 22, 19, 5],
    [25, 15, 9, 18, 11],
    [1, 7, 21, 3, 6]
  ];


  let winamount = 0;

  function generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const numbers = [];

  while (numbers.length < 5) {
    const randomNumber = generateRandomInt(1, 26);
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }

  console.log(numbers);
  const randomNumber = Math.floor(Math.random() * 2) + 1;

  console.log(randomNumber);

  //Matrix 1 
  //ROWS
  for (let i = 0; i < matrix1.length; i++) {
    const m = matrix1[i];

    let is4 = false;

    for (let j = 0; j < 2; j++) {
      const list = [];
      list.push(m[j]);
      list.push(m[j + 1]);
      list.push(m[j + 2]);
      list.push(m[j + 3]);

      if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
        winamount = winamount + 20 * betamount1;
        is4 = true;
      }
    }

    if (!is4) {
      for (let j = 0; j < 3; j++) {
        const list = [];
        list.push(m[j]);
        list.push(m[j + 1]);
        list.push(m[j + 2]);


        if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
          winamount = winamount + 4 * betamount1;

        }
      }
    }
  }
  //COLUMNS
  for (let i = 0; i < matrix1.length; i++) {
    const m = [];
    m.push(matrix1[0][i]);
    m.push(matrix1[1][i]);
    m.push(matrix1[2][i]);
    m.push(matrix1[3][i]);
    m.push(matrix1[4][i]);

    let is4 = false;

    for (let j = 0; j < 2; j++) {
      const list = [];
      list.push(m[j]);
      list.push(m[j + 1]);
      list.push(m[j + 2]);
      list.push(m[j + 3]);

      if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
        winamount = winamount + 20 * betamount1;
        is4 = true;
      }
    }

    if (!is4) {
      for (let j = 0; j < 3; j++) {
        const list = [];
        list.push(m[j]);
        list.push(m[j + 1]);
        list.push(m[j + 2]);


        if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
          winamount = winamount + 4 * betamount1;

        }
      }
    }
  }

  //DIAGONALS
  let list = [8, 18, 14, 4];
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount1;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount1;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount1;
  }

  list = [1, 10, 11, 13];
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount1;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount1;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount1;
  }

  list = [23, 14, 11, 7];
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount1;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount1;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount1;
  }

  list = [24, 18, 10, 25];
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount1;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount1;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount1;
  }

  list = [6, 21, 2]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount1;
  }

  list = [9, 19, 17]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount1;
  }

  list = [2, 20, 17]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount1;
  }

  list = [6, 22, 9]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount1;
  }

  list = [5, 22, 16, 20, 15]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount1;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3]) && numbers.includes(list[4])) {
    winamount = winamount + 20 * betamount1;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount1;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount1;
  }
  else if (numbers.includes(list[2]) && numbers.includes(list[3]) && numbers.includes(list[4])) {
    winamount = winamount + 4 * betamount1;
  }

  list = [12, 21, 16, 19, 3]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount1;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3]) && numbers.includes(list[4])) {
    winamount = winamount + 20 * betamount1;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount1;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount1;
  }
  else if (numbers.includes(list[2]) && numbers.includes(list[3]) && numbers.includes(list[4])) {
    winamount = winamount + 4 * betamount1;
  }


  //<-------------------------------------------------------------------------------------------------------------------------------------------------------->

  // Matrix 2
  // ROWS
  for (let i = 0; i < matrix2.length; i++) {
    const row = matrix2[i];

    let is4 = false;

    for (let j = 0; j < 2; j++) {
      const list = [];
      list.push(row[j]);
      list.push(row[j + 1]);
      list.push(row[j + 2]);
      list.push(row[j + 3]);

      if (
        numbers.includes(list[0]) &&
        numbers.includes(list[1]) &&
        numbers.includes(list[2]) &&
        numbers.includes(list[3])
      ) {
        winamount = winamount + 20 * betamount2;
        is4 = true;
      }
    }

    if (!is4) {
      for (let j = 0; j < 3; j++) {
        const list = [];
        list.push(row[j]);
        list.push(row[j + 1]);
        list.push(row[j + 2]);

        if (
          numbers.includes(list[0]) &&
          numbers.includes(list[1]) &&
          numbers.includes(list[2])
        ) {
          winamount = winamount + 4 * betamount2;
        }
      }
    }
  }

  // COLUMNS
  for (let i = 0; i < matrix2.length; i++) {
    const column = [];
    column.push(matrix2[0][i]);
    column.push(matrix2[1][i]);
    column.push(matrix2[2][i]);
    column.push(matrix2[3][i]);
    column.push(matrix2[4][i]);

    let is4 = false;

    for (let j = 0; j < 2; j++) {
      const list = [];
      list.push(column[j]);
      list.push(column[j + 1]);
      list.push(column[j + 2]);
      list.push(column[j + 3]);

      if (
        numbers.includes(list[0]) &&
        numbers.includes(list[1]) &&
        numbers.includes(list[2]) &&
        numbers.includes(list[3])
      ) {
        winamount = winamount + 20 * betamount2;
        is4 = true;
      }
    }

    if (!is4) {
      for (let j = 0; j < 3; j++) {
        const list = [];
        list.push(column[j]);
        list.push(column[j + 1]);
        list.push(column[j + 2]);

        if (
          numbers.includes(list[0]) &&
          numbers.includes(list[1]) &&
          numbers.includes(list[2])
        ) {
          winamount = winamount + 4 * betamount2;
        }
      }
    }
  }

  // DIAGONALS

  list = [13, 18, 11, 23];
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount2;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount2;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount2;
  }

  list = [24, 14, 12, 8];
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount2;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount2;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount2;
  }

  list = [25, 12, 11, 7];
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount2;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount2;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount2;
  }

  list = [4, 14, 18, 1];
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount2;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount2;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount2;
  }

  list = [2, 22, 5]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount2;
  }

  list = [16, 20, 17]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount2;
  }

  list = [7, 21, 5]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount2;
  }

  list = [16, 19, 2]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount2;
  }

  list = [9, 19, 15, 21, 3]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount2;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3]) && numbers.includes(list[4])) {
    winamount = winamount + 20 * betamount2;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount2;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount2;
  }
  else if (numbers.includes(list[2]) && numbers.includes(list[3]) && numbers.includes(list[4])) {
    winamount = winamount + 4 * betamount2;
  }

  list = [6, 20, 15, 22, 10]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount2;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3]) && numbers.includes(list[4])) {
    winamount = winamount + 20 * betamount2;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount2;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount2;
  }
  else if (numbers.includes(list[2]) && numbers.includes(list[3]) && numbers.includes(list[4])) {
    winamount = winamount + 4 * betamount2;
  }


  //<---------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Matrix 3
  // ROWS
  for (let i = 0; i < matrix3.length; i++) {
    const row = matrix3[i];

    let is4 = false;

    for (let j = 0; j < 2; j++) {
      const list = [];
      list.push(row[j]);
      list.push(row[j + 1]);
      list.push(row[j + 2]);
      list.push(row[j + 3]);

      if (
        numbers.includes(list[0]) &&
        numbers.includes(list[1]) &&
        numbers.includes(list[2]) &&
        numbers.includes(list[3])
      ) {
        winamount = winamount + 20 * betamount3;
        is4 = true;
      }
    }

    if (!is4) {
      for (let j = 0; j < 3; j++) {
        const list = [];
        list.push(row[j]);
        list.push(row[j + 1]);
        list.push(row[j + 2]);

        if (
          numbers.includes(list[0]) &&
          numbers.includes(list[1]) &&
          numbers.includes(list[2])
        ) {
          winamount = winamount + 4 * betamount3;
        }
      }
    }
  }

  // COLUMNS
  for (let i = 0; i < matrix3.length; i++) {
    const column = [];
    column.push(matrix3[0][i]);
    column.push(matrix3[1][i]);
    column.push(matrix3[2][i]);
    column.push(matrix3[3][i]);
    column.push(matrix3[4][i]);

    let is4 = false;

    for (let j = 0; j < 2; j++) {
      const list = [];
      list.push(column[j]);
      list.push(column[j + 1]);
      list.push(column[j + 2]);
      list.push(column[j + 3]);

      if (
        numbers.includes(list[0]) &&
        numbers.includes(list[1]) &&
        numbers.includes(list[2]) &&
        numbers.includes(list[3])
      ) {
        winamount = winamount + 20 * betamount3;
        is4 = true;
      }
    }

    if (!is4) {
      for (let j = 0; j < 3; j++) {
        const list = [];
        list.push(column[j]);
        list.push(column[j + 1]);
        list.push(column[j + 2]);

        if (
          numbers.includes(list[0]) &&
          numbers.includes(list[1]) &&
          numbers.includes(list[2])
        ) {
          winamount = winamount + 4 * betamount3;
        }
      }
    }
  }

  // DIAGONALS
  list = [23, 19, 9, 4];
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount3;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount3;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount3;
  }

  list = [7, 12, 16, 25];
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount3;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount3;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount3;
  }

  list = [2, 16, 9, 13];
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount3;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount3;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount3;
  }

  list = [11, 19, 12, 24];
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount3;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount3;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount3;
  }

  list = [5, 17, 21]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount3;
  }

  list = [3, 18, 22]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount3;
  }

  list = [21, 15, 22]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount3;
  }

  list = [5, 4, 3]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount3;
  }

  list = [6, 4, 20, 15, 8]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount3;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3]) && numbers.includes(list[4])) {
    winamount = winamount + 20 * betamount3;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount3;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount3;
  }
  else if (numbers.includes(list[2]) && numbers.includes(list[3]) && numbers.includes(list[4])) {
    winamount = winamount + 4 * betamount3;
  }

  list = [1, 18, 20, 17, 10]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount3;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3]) && numbers.includes(list[4])) {
    winamount = winamount + 20 * betamount3;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount3;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount3;
  }
  else if (numbers.includes(list[2]) && numbers.includes(list[3]) && numbers.includes(list[4])) {
    winamount = winamount + 4 * betamount3;
  }

  //<------------------------------------------------------------------------------------------------------------------------------------------------
  // Matrix 4
  // ROWS
  for (let i = 0; i < matrix4.length; i++) {
    const row = matrix4[i];

    let is4 = false;

    for (let j = 0; j < 2; j++) {
      const list = [];
      list.push(row[j]);
      list.push(row[j + 1]);
      list.push(row[j + 2]);
      list.push(row[j + 3]);

      if (
        numbers.includes(list[0]) &&
        numbers.includes(list[1]) &&
        numbers.includes(list[2]) &&
        numbers.includes(list[3])
      ) {
        winamount = winamount + 20 * betamount4;
        is4 = true;
      }
    }

    if (!is4) {
      for (let j = 0; j < 3; j++) {
        const list = [];
        list.push(row[j]);
        list.push(row[j + 1]);
        list.push(row[j + 2]);

        if (
          numbers.includes(list[0]) &&
          numbers.includes(list[1]) &&
          numbers.includes(list[2])
        ) {
          winamount = winamount + 4 * betamount4;
        }
      }
    }
  }

  // COLUMNS
  for (let i = 0; i < matrix4.length; i++) {
    const column = [];
    column.push(matrix4[0][i]);
    column.push(matrix4[1][i]);
    column.push(matrix4[2][i]);
    column.push(matrix4[3][i]);
    column.push(matrix4[4][i]);

    let is4 = false;

    for (let j = 0; j < 2; j++) {
      const list = [];
      list.push(column[j]);
      list.push(column[j + 1]);
      list.push(column[j + 2]);
      list.push(column[j + 3]);

      if (
        numbers.includes(list[0]) &&
        numbers.includes(list[1]) &&
        numbers.includes(list[2]) &&
        numbers.includes(list[3])
      ) {
        winamount = winamount + 20 * betamount4;
        is4 = true;
      }
    }

    if (!is4) {
      for (let j = 0; j < 3; j++) {
        const list = [];
        list.push(column[j]);
        list.push(column[j + 1]);
        list.push(column[j + 2]);

        if (
          numbers.includes(list[0]) &&
          numbers.includes(list[1]) &&
          numbers.includes(list[2])
        ) {
          winamount = winamount + 4 * betamount4;
        }
      }
    }
  }

  // DIAGONALS
  list = [24, 14, 12, 1]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount4;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount4;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount4;
  }

  list = [7, 18, 11, 23];
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount4;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount4;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount4;
  }

  list = [8, 11, 12, 25]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount4;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount4;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount4;
  }

  list = [4, 18, 14, 13]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount4;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount4;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount4;
  }

  list = [15, 20, 16]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount4;
  }

  list = [10, 22, 2]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount4;
  }

  list = [10, 21, 15]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount4;
  }

  list = [2, 19, 16]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount4;
  }

  list = [3, 21, 17, 19, 5]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount4;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3]) && numbers.includes(list[4])) {
    winamount = winamount + 20 * betamount4;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount4;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount4;
  }
  else if (numbers.includes(list[2]) && numbers.includes(list[3]) && numbers.includes(list[4])) {
    winamount = winamount + 4 * betamount4;
  }

  list = [9, 22, 17, 20, 6]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount4;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3]) && numbers.includes(list[4])) {
    winamount = winamount + 20 * betamount4;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount4;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount4;
  }
  else if (numbers.includes(list[2]) && numbers.includes(list[3]) && numbers.includes(list[4])) {
    winamount = winamount + 4 * betamount4;
  }

  //<---------------------------------------------------------------------------------------------------------------------------------------------------------
  // Matrix 5
  // ROWS
  for (let i = 0; i < matrix5.length; i++) {
    const row = matrix5[i];

    let is4 = false;

    for (let j = 0; j < 2; j++) {
      const list = [];
      list.push(row[j]);
      list.push(row[j + 1]);
      list.push(row[j + 2]);
      list.push(row[j + 3]);

      if (
        numbers.includes(list[0]) &&
        numbers.includes(list[1]) &&
        numbers.includes(list[2]) &&
        numbers.includes(list[3])
      ) {
        winamount = winamount + 20 * betamount5;
        is4 = true;
      }
    }

    if (!is4) {
      for (let j = 0; j < 3; j++) {
        const list = [];
        list.push(row[j]);
        list.push(row[j + 1]);
        list.push(row[j + 2]);

        if (
          numbers.includes(list[0]) &&
          numbers.includes(list[1]) &&
          numbers.includes(list[2])
        ) {
          winamount = winamount + 4 * betamount5;
        }
      }
    }
  }

  // COLUMNS
  for (let i = 0; i < matrix5.length; i++) {
    const column = [];
    column.push(matrix5[0][i]);
    column.push(matrix5[1][i]);
    column.push(matrix5[2][i]);
    column.push(matrix5[3][i]);
    column.push(matrix5[4][i]);

    let is4 = false;

    for (let j = 0; j < 2; j++) {
      const list = [];
      list.push(column[j]);
      list.push(column[j + 1]);
      list.push(column[j + 2]);
      list.push(column[j + 3]);

      if (
        numbers.includes(list[0]) &&
        numbers.includes(list[1]) &&
        numbers.includes(list[2]) &&
        numbers.includes(list[3])
      ) {
        winamount = winamount + 20 * betamount5;
        is4 = true;
      }
    }

    if (!is4) {
      for (let j = 0; j < 3; j++) {
        const list = [];
        list.push(column[j]);
        list.push(column[j + 1]);
        list.push(column[j + 2]);

        if (
          numbers.includes(list[0]) &&
          numbers.includes(list[1]) &&
          numbers.includes(list[2])
        ) {
          winamount = winamount + 4 * betamount5;
        }
      }
    }
  }

  // DIAGONALS
  list = [25, 19, 16, 2]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount5;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount5;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount5;
  }

  list = [6, 3, 12, 8]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount5;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount5;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount5;
  }

  list = [13, 12, 16, 24]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount5;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount5;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount5;
  }

  list = [23, 3, 19, 10]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount5;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount5;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount5;
  }

  list = [20, 14, 22]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount5;
  }

  list = [1, 15, 9]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount5;
  }

  list = [1, 17, 20]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount5;
  }

  list = [9, 18, 22]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount5;
  }

  list = [4, 15, 21, 14, 11]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount5;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3]) && numbers.includes(list[4])) {
    winamount = winamount + 20 * betamount5;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount5;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount5;
  }
  else if (numbers.includes(list[2]) && numbers.includes(list[3]) && numbers.includes(list[4])) {
    winamount = winamount + 4 * betamount5;
  }

  list = [5, 17, 21, 18, 7]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount5;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3]) && numbers.includes(list[4])) {
    winamount = winamount + 20 * betamount5;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount5;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount5;
  }
  else if (numbers.includes(list[2]) && numbers.includes(list[3]) && numbers.includes(list[4])) {
    winamount = winamount + 4 * betamount5;
  }

  //<------------------------------------------------------------------------------------------------------------------------------------
  // Matrix 6
  // ROWS
  for (let i = 0; i < matrix6.length; i++) {
    const row = matrix6[i];

    let is4 = false;

    for (let j = 0; j < 2; j++) {
      const list = [];
      list.push(row[j]);
      list.push(row[j + 1]);
      list.push(row[j + 2]);
      list.push(row[j + 3]);

      if (
        numbers.includes(list[0]) &&
        numbers.includes(list[1]) &&
        numbers.includes(list[2]) &&
        numbers.includes(list[3])
      ) {
        winamount = winamount + 20 * betamount6;
        is4 = true;
      }
    }

    if (!is4) {
      for (let j = 0; j < 3; j++) {
        const list = [];
        list.push(row[j]);
        list.push(row[j + 1]);
        list.push(row[j + 2]);

        if (
          numbers.includes(list[0]) &&
          numbers.includes(list[1]) &&
          numbers.includes(list[2])
        ) {
          winamount = winamount + 4 * betamount6;
        }
      }
    }
  }

  // COLUMNS
  for (let i = 0; i < matrix6.length; i++) {
    const column = [];
    column.push(matrix6[0][i]);
    column.push(matrix6[1][i]);
    column.push(matrix6[2][i]);
    column.push(matrix6[3][i]);
    column.push(matrix6[4][i]);

    let is4 = false;

    for (let j = 0; j < 2; j++) {
      const list = [];
      list.push(column[j]);
      list.push(column[j + 1]);
      list.push(column[j + 2]);
      list.push(column[j + 3]);

      if (
        numbers.includes(list[0]) &&
        numbers.includes(list[1]) &&
        numbers.includes(list[2]) &&
        numbers.includes(list[3])
      ) {
        winamount = winamount + 20 * betamount6;
        is4 = true;
      }
    }

    if (!is4) {
      for (let j = 0; j < 3; j++) {
        const list = [];
        list.push(column[j]);
        list.push(column[j + 1]);
        list.push(column[j + 2]);

        if (
          numbers.includes(list[0]) &&
          numbers.includes(list[1]) &&
          numbers.includes(list[2])
        ) {
          winamount = winamount + 4 * betamount6;
        }
      }
    }
  }

  // DIAGONALS
  list = [2, 12, 9, 3]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount6;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount6;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount6;
  }

  list = [23, 16, 19, 11]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount6;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount6;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount6;
  }

  list = [8, 17, 22, 18, 6]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount6;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount6;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount6;
  }

  list = [24, 19, 9, 7]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount6;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount6;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount6;
  }

  list = [20, 15, 21]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount6;
  }

  list = [10, 14, 5]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount6;
  }

  list = [5, 18, 21]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount6;
  }

  list = [10, 17, 20]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount6;
  }

  list = [8, 17, 22, 18, 6]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount6;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3]) && numbers.includes(list[4])) {
    winamount = winamount + 20 * betamount6;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount6;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount6;
  }
  else if (numbers.includes(list[2]) && numbers.includes(list[3]) && numbers.includes(list[4])) {
    winamount = winamount + 4 * betamount6;
  }

  list = [4, 14, 22, 15, 1]
  if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 20 * betamount6;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3]) && numbers.includes(list[4])) {
    winamount = winamount + 20 * betamount6;
  }
  else if (numbers.includes(list[0]) && numbers.includes(list[1]) && numbers.includes(list[2])) {
    winamount = winamount + 4 * betamount6;
  }
  else if (numbers.includes(list[1]) && numbers.includes(list[2]) && numbers.includes(list[3])) {
    winamount = winamount + 4 * betamount6;
  }
  else if (numbers.includes(list[2]) && numbers.includes(list[3]) && numbers.includes(list[4])) {
    winamount = winamount + 4 * betamount6;
  }


  //console.log(numbers)
  //console.log(randomNumber)
  //console.log(winamount)
  //console.log(randomNumber*winamount)

  const ans = numbers
  ans.push(randomNumber)
  ans.push(winamount * randomNumber)

  return ans
}


// const bingoBetsPlaced = async (req, res) => {
//   const id = req.body.id;
//   const target_bets = req.body.target_bet;
//   const bets = JSON.parse(target_bets)
//   const set = bets[0] + bets[1] + bets[2] + bets[3] + bets[4] + bets[5]
//   //console.log(bets)


//   var sql = 'SELECT * FROM players WHERE id = ?'

//   conn.query(sql, [id], (err, result) => {
//     if (err) {
//       res.json(err);
//     }
//     else {
//       if (result.length == 0) {
//         const reply = { message: "User Not Found" }
//         res.status(404).json(reply)
//       }
//       else {

//         const ans = getwinamount(bets[0], bets[1], bets[2], bets[3], bets[4], bets[5])
//         var win
//         const bal = result[0].balance;

//         sql = 'UPDATE players SET balance = ? WHERE id = ?'
//         conn.query(sql, [bal - set, id], (err, result) => {
//           if (err) {
//             throw err;
//           }
//         })
//         if (ans.length < 7) {
//           win = 0
//         }
//         else {
//           win = ans[6]
//         }
//         if (isNaN(win)) {
//           win = 0
//         }
//         const bingo = []
//         bingo.push(ans[0])
//         bingo.push(ans[1])
//         bingo.push(ans[2])
//         bingo.push(ans[3])
//         bingo.push(ans[4])
//         bingo.push(ans[5])

//         sql = 'UPDATE players SET win_amount = ? WHERE id = ?'
//         conn.query(sql, [win, id], (err, result) => {
//           if (err) {
//             throw err;
//           }
//         })
//         const reply = {
//           message: "Bets Have Been Placed",
//           data: { bingo: bingo, win_amount: win, balance: bal - set }
//         }
//         res.status(200).json(reply)


//       }
//     }
//   })
// }

// const bingoDoubleUp = async (req, res) => {
//   const id = req.body.id;
//   const choice = req.body.double_Up;
//   //const winamount = req.body.win_amount;
//   //const w = parseFloat(winamount)

//   var sql = 'SELECT * FROM players WHERE id = ?'

//   conn.query(sql, [id], (err, result) => {
//     if (err) {
//       res.json(err);
//     }
//     else {
//       if (result.length == 0) {
//         const reply = { message: "User Not Found" }
//         res.status(404).json(reply)
//       }
//       else {

//         const small = [0, 1, 2, 3, 4, 5, 13, 14, 15, 16, 17, 18, 26, 27, 28, 29, 30, 31, 39, 40, 41, 42, 43, 44]
//         const guarantee = [6, 19, 32, 45]
//         const big = [7, 8, 9, 10, 11, 12, 20, 21, 22, 23, 24, 25, 33, 34, 35, 36, 37, 38, 46, 47, 48, 49, 50, 51]

//         let randomNumber = Math.floor(Math.random() * 52); // Generates a random number between 0 and 51
//         const w = result[0].win_amount
//         let win = 0
//         if (guarantee.includes(randomNumber)) {
//           win = 2 * w
//         }
//         else {
//           if (choice === 'small' && small.includes(randomNumber)) {
//             win = 2 * w
//           }

//           if (choice === 'big' && big.includes(randomNumber)) {
//             win = 2 * w
//           }
//         }
//         const reply = {
//           message: "Sending Updated Win Amount",
//           data: {
//             "double_up_number": randomNumber,
//             "win_amount": win
//           }
//         }
//         sql = 'UPDATE players SET win_amount = ? WHERE id = ?'
//         conn.query(sql, [win, id], (err, result) => {
//           if (err) {
//             throw err;
//           }
//         })
//         res.status(200).json(reply)


//       }
//     }
//   })

// }

// const bingoTakeAmount = async (req, res) => {
//   const id = req.body.id;

//   var sql = 'SELECT * FROM players WHERE id = ?'

//   conn.query(sql, [id], (err, result) => {
//     if (err) {
//       res.json(err);
//     }
//     else {
//       if (result.length == 0) {
//         const reply = { message: "User Not Found" }
//         res.status(404).json(reply)
//       }
//       else {

//         const win = result[0].win_amount
//         const bal = result[0].balance

//         sql = 'UPDATE players SET win_amount = ? WHERE id = ?'

//         conn.query(sql, [0, id], (err, result) => {
//           if (err) {
//             throw err;
//           }
//         })

//         const newbal = bal + win;

//         sql = 'UPDATE players SET balance = ? WHERE id = ?'

//         conn.query(sql, [newbal, id], (err, result) => {
//           if (err) {
//             throw err;
//           }
//         })

//         const reply = { message: 'Amount Added to Balance', balance: newbal }
//         res.status(200).json(reply)
//       }
//     }
//   })

// }

// const bingoGetBalance = async (req, res) => {
//   const id = req.body.id;

//   var sql = 'SELECT * FROM players where id = ?'

//   conn.query(sql, [id], (err, result) => {
//     if (err) {
//       throw err;
//     }
//     else {
//       if (result.length == 0) {
//         const reply = { message: "User Not Found" }
//         res.status(404).json(reply)
//       }
//       else {
//         const bal = result[0].balance;
//         const reply = { balance: bal }
//         res.status(200).json(reply)
//       }
//     }
//   })
// }

const bingoBetsPlaced = async (req, res) => {
  const email = req.body.email;
  const target_bets = req.body.target_bet;
  const bets = JSON.parse(target_bets)
  const set = bets[0] + bets[1] + bets[2] + bets[3] + bets[4] + bets[5]
  //console.log(bets)


  var sql = 'SELECT * FROM users WHERE email = ?'

  conn.query(sql, [email], (err, result) => {
    if (err) {
      res.json(err);
    }
    else {
      if (result.length == 0) {
        const reply = { message: "User Not Found" }
        res.status(404).json(reply)
      }
      else {

        const ans = getwinamount(bets[0], bets[1], bets[2], bets[3], bets[4], bets[5])
        var win
        const poi = result[0].point;

        sql = 'UPDATE users SET point = ? WHERE email = ?'
        conn.query(sql, [poi - set, email], (err, result) => {
          if (err) {
            throw err;
          }
        })
        if (ans.length < 7) {
          win = 0
        }
        else {
          win = ans[6]
        }
        if (isNaN(win)) {
          win = 0
        }
        const bingo = []
        bingo.push(ans[0])
        bingo.push(ans[1])
        bingo.push(ans[2])
        bingo.push(ans[3])
        bingo.push(ans[4])
        bingo.push(ans[5])

        sql = 'UPDATE users SET win_amount = ? WHERE email = ?'
        conn.query(sql, [win, email], (err, result) => {
          if (err) {
            throw err;
          }
        })
        const reply = {
          message: "Bets Have Been Placed",
          data: { bingo: bingo, win_amount: win, point: poi - set }
        }
        res.status(200).json(reply)


      }
    }
  })
}

const bingoDoubleUp = async (req, res) => {
  const email = req.body.email;
  const choice = req.body.double_Up;
  //const winamount = req.body.win_amount;
  //const w = parseFloat(winamount)

  var sql = 'SELECT * FROM users WHERE email = ?'

  conn.query(sql, [email], (err, result) => {
    if (err) {
      res.json(err);
    }
    else {
      if (result.length == 0) {
        const reply = { message: "User Not Found" }
        res.status(404).json(reply)
      }
      else {

        const small = [0, 1, 2, 3, 4, 5, 13, 14, 15, 16, 17, 18, 26, 27, 28, 29, 30, 31, 39, 40, 41, 42, 43, 44]
        const guarantee = [6, 19, 32, 45]
        const big = [7, 8, 9, 10, 11, 12, 20, 21, 22, 23, 24, 25, 33, 34, 35, 36, 37, 38, 46, 47, 48, 49, 50, 51]

        let randomNumber = Math.floor(Math.random() * 52); // Generates a random number between 0 and 51
        const w = result[0].win_amount
        let win = 0
        if (guarantee.includes(randomNumber)) {
          win = 2 * w
        }
        else {
          if (choice === 'small' && small.includes(randomNumber)) {
            win = 2 * w
          }

          if (choice === 'big' && big.includes(randomNumber)) {
            win = 2 * w
          }
        }
        const reply = {
          message: "Sending Updated Win Amount",
          data: {
            "double_up_number": randomNumber,
            "win_amount": win
          }
        }
        sql = 'UPDATE users SET win_amount = ? WHERE email = ?'
        conn.query(sql, [win, email], (err, result) => {
          if (err) {
            throw err;
          }
        })
        res.status(200).json(reply)


      }
    }
  })

}

const bingoTakeAmount = async (req, res) => {
  const email = req.body.email;

  var sql = 'SELECT * FROM users WHERE email = ?'

  conn.query(sql, [email], (err, result) => {
    if (err) {
      res.json(err);
    }
    else {
      if (result.length == 0) {
        const reply = { message: "User Not Found" }
        res.status(404).json(reply)
      }
      else {

        const win = result[0].win_amount
        const poi = result[0].point

        sql = 'UPDATE users SET win_amount = ? WHERE email = ?'

        conn.query(sql, [0, email], (err, result) => {
          if (err) {
            throw err;
          }
        })

        const newpoi = poi + win;

        sql = 'UPDATE users SET point = ? WHERE email = ?'

        conn.query(sql, [newpoi, email], (err, result) => {
          if (err) {
            throw err;
          }
        })

        const reply = { message: 'Amount Added to Point', point: newpoi }
        res.status(200).json(reply)
      }
    }
  })

}

const bingoGetBalance = async (req, res) => {
  const email = req.body.email;

  var sql = 'SELECT * FROM users where email = ?'

  conn.query(sql, [email], (err, result) => {
    if (err) {
      throw err;
    }
    else {
      if (result.length == 0) {
        const reply = { message: "User Not Found" }
        res.status(404).json(reply)
      }
      else {
        const poi = result[0].point;
        const reply = { point: poi }
        res.status(200).json(reply)
      }
    }
  })
}


















module.exports = {
  DeletePreviousWinamount,
  Winamount,
  gamerunningtriplechance,
  gamerunningroulette,
  gamerunningandarbahar,
  gamerunningfuntarget,
  gamerunning,
  Adminfuntarget,
  Adminandarbahar,
    Adminroulette,
  Admintriplechance,
  Admin7up,
  getAdmin7up,
  getAdminroulette,
  getAdminandarbahar,
  getAdminfuntarget,
  getAdmintriplechance,

  CheckPlayer,
  SetplayerOnline,
  SetplayerOffline,
  
  onbalance,
  transferPoint,
  /* createDistrubutor ,
    createStokez,
    createAgent,
    createPlayer,
    createUser,  
    getUsers,
    getAdminData,
    sendPoints,
    changePassword,
    resetPassword,
    getAgents,
    getAgentsData, */
  getPlayerData,
  getPlayerHistoryData,
  getSuperMasterData,
  getMasterIdData,

  changePercentage,
  UserShare,
  jokerBetPlaced,
  jokerTakeAmount,
  jokerDoubleUp,
  bingoBetsPlaced,
  bingoDoubleUp,
  bingoTakeAmount,
  bingoGetBalance,









  sendPoints,
  sendPointstoSuperMaster,
  sendPointstoMasterId,
  sendPointstoPlayer,

  //getAllPlayerData,
  AndarBaharGamePlayHistoryData,
  RoulletGamePlayHistoryData,
  FunTargetGamePlayHistoryData,
  TripleChanceGamePlayHistoryData,
  SevenUpGamePlayHistoryData,
  // PokergetPlayerHistoryData,
  // TigerVsElephantgetPlayerHistoryData,
  //LuckyBallgetPlayerHistoryData,
  Transaction,
  PointTransfer,
  PointReceive,
  PointCancel,
  PointRejected,
  PointHistory,
  GameReport,
  DailyStatus,

  getPlayerIdData,
  updateUser,
  updateSuperMaster,
  updateMasterId
  /* getStokezPointHistory,
    getAgentPointHistory,
    getPlayerPointHistory,
    getDoubleChanceHistory,
    getJeetoJokerHistory,
    get16CardsHistory,
    getSpinGameHistory,
 */
};
