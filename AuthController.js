const bcrypt = require('bcrypt');
// const check = require('../validation/CheckValidation') 
const conn = require('../config/db')
const moment = require('moment');
//const {authToken} =require('../middleware/getToken')
//User login 
var nodemailer = require('nodemailer');
const e = require('express');


const authLogin = async (req, res) => {
    let message = null;
    let statusCode = 400;
    let error = {};
    let data = {};
  
    try {
      const { email, password, device_id } = req.body;
      let sql = `SELECT * FROM users WHERE LOWER(users.email) = ?`;
      let user = await conn.query(sql, [email.toLowerCase()]);
  
      if (user.length > 0) {
        const usersRows = JSON.parse(JSON.stringify(user))[0];
        const comparison = password == usersRows.password;
  
        if (comparison) {
          const updateSuccess = await updateDeviceId(email, device_id);
  
          if (updateSuccess) {
            const last_login = moment().format('YYYY-MM-DD HH:mm:ss');
            statusCode = 200;
            message = 'Login success';
            data = {
              id: usersRows.id,
              distributor_id: 'masterid',
              user_id: usersRows.email,
              username: usersRows.first_name,
              IMEI_no: '0',
              device: 'abcd',
              last_logged_in: usersRows.last_login,
              last_logged_out: usersRows.last_login,
              IsBlocked: usersRows.status,
              password: usersRows.password,
              created_at: usersRows.created,
              updated_at: usersRows.modified,
              active: usersRows.status,
              coins: usersRows.point
            };
          } else {
            statusCode = 500;
            message = 'Failed to update device ID';
          }
        } else {
          statusCode = 401;
          message = 'Password does not match!';
        }
      } else {
        statusCode = 401;
        message = 'Password or email does not match!';
      }
  
      const responseData = {
        status: statusCode,
        message,
        data,
        errors: error,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlIjoiU3VwZXIgQWRtaW4iLCJyb2xlX2lkIjoxLCJhZG1pbl9pZCI6MSwiaWF0IjoxNjUzMTMwNDMwLCJleHAiOjE2NTMxMzQwMzB9.hU41Zvx5uoaI7Nt46LaL8GFjTjAXUnet6GKhc5Ku4TA'
      };
  
      res.send(responseData);
    }  catch (error) {
      res.send({ authLogin: error });
    }
  };
  

const isAlreadyLoggedin = async (req, res) => {
    let message = null
    let statusCode = 400
    try {

        const { email, device_id } = req.body;


        // Check requeted user is exist or not
        let sql =  'SELECT device_id FROM users WHERE email = ?';
        let user = await conn.query(sql, [email]);
        const storedDeviceId = user[0]?.device_id;

       // if (user.length > 0) {
        if (storedDeviceId === device_id || storedDeviceId === null) {
            statusCode = 200
            message = 'isAlreadyLoggedIn'
           
        } else {
            statusCode = 204
            message = 'Login '
        }



        const responseData = {
            status: statusCode,
            message
        }
        res.send(responseData)

    } catch (error) {
        res.send({ error: error })
    }
};



const forceloginDeviceId = async (req,res) => {
    let message = null
        let statusCode = 400
        try {
    
            const { email, newDeviceId } = req.body
            let sql = 'UPDATE users SET device_id = ? WHERE email = ?';
            let user = await conn.query(sql,[newDeviceId, email]);
            if (user) {
                statusCode = 200
                message = 'force login successfully'
           
            } else {
                statusCode = 404
                message = 'login not allowed '
            }
    const responseData = {
                status: statusCode,
                message
            }
            res.send(responseData)
    
        } catch (error) {
            res.send({ error: error })
    
            console.log("updateDeviceId",error )
        }
    }
      
  



const authSignUp = async (req, res) => {
    let message = null
    let register = false

    let statusCode = 400
    try {

        const { username, email, password } = req.body

        const encryptedPassword = await bcrypt.hash(password, 10)
        const formData = {
            username: username,
            email: email,
            password: encryptedPassword
        };

        // Check requeted user is exist or not
        let sql = `SELECT * FROM users WHERE LOWER(email)= ? limit ?`;
        let user = await conn.query(sql, [formData.email.toLowerCase(), 1]);
        if (user.length > 0) {
            statusCode = 401
            message = 'Sorry! Email already exist try another email'
        } else {
            const sql1 = `INSERT INTO users set ?`;
            const users = await conn.query(sql1, formData)
            if (users) {
                statusCode = 201
                message = "User created success"
                register = true
            } else {
                statusCode = 500
                message = "Something went wrong! database error"
            }
        }

        const responseData = {
            status: statusCode,
            message,
            register,

        }
        res.send(responseData)

    } catch (error) {
        res.send({ error: error })
    }
}


const resetPassword = async (req, res) => {
    let message = null
    let statusCode = 400
    try {

        const { email, new_password, old_password } = req.body

        const encryptedPassword = await bcrypt.hash(old_password, 10)
        // Check requeted user is exist or not
        let sql = `SELECT * FROM users WHERE LOWER(email)= ?  limit ?`;
        let user = await conn.query(sql, [email.toLowerCase(), 1]);
        if (user.length > 0) {
            const usersRows = (JSON.parse(JSON.stringify(user))[0]);
            const comparison = await bcrypt.compare(old_password, usersRows.password)
            if (comparison) {
                const encryptedPassword2 = await bcrypt.hash(new_password, 10)

                let sql2 = "UPDATE users Set password=? WHERE email= ?"
                const user = await conn.query(sql2, [encryptedPassword2, email])
                if (user) {
                    statusCode = 200
                    message = 'Password reset successfully'
                } else {
                    statusCode = 500
                    message = 'Something Went wrong'
                }
            } else {
                statusCode = 401
                message = 'Password does not match!'
            }

        } else {
            statusCode = 404
            message = 'Sorry Invalid email or password'
        }



        const responseData = {
            status: statusCode,
            message
        }
        res.send(responseData)

    } catch (error) {
        res.send({ error: error })
    }
}




const adduserbyadmin = async (req, res) => {
    let message = null
    let register = false

    let statusCode = 400
    try {

        const { full_name, email, password, role_id } = req.body

        const encryptedPassword = await bcrypt.hash(password, 10)
        const formData = {
            full_name: full_name,
            email: email,
            password: encryptedPassword,

        };

        // Check requeted user is exist or not
        if (role_id == 2) {
            let sql = `SELECT * FROM supermaster WHERE LOWER(email)= ? limit ?`;
            let user = await conn.query(sql, [formData.email.toLowerCase(), 1]);
            if (user.length > 0) {
                statusCode = 201
                message = 'Sorry! Email already exist try another email'
            } else {
                const sql1 = `INSERT INTO supermaster set ?`;
                const users = await conn.query(sql1, formData)
                if (users) {
                    statusCode = 200
                    message = "SuperMaster created success"
                    register = true
                } else {
                    statusCode = 500
                    message = "Something went wrong! database error"
                }
            }
        }



        if (role_id == 3) {
            let sql = `SELECT * FROM masterid WHERE LOWER(email)= ? limit ?`;
            let user = await conn.query(sql, [formData.email.toLowerCase(), 1]);
            if (user.length > 0) {
                statusCode = 201
                message = 'Sorry! Email already exist try another email'
            } else {
                const sql1 = `INSERT INTO masterid set ?`;
                const users = await conn.query(sql1, formData)
                if (users) {
                    statusCode = 200
                    message = "MasterId created success"
                    register = true
                } else {
                    statusCode = 500
                    message = "Something went wrong! database error"
                }
            }
        }


        if (role_id == 4) {
            /*      var playerid=""
                 const sql2 = `SELECT COUNT(*) as totalcount  FROM users`;
                 const allusers = await conn.query(sql2)
                   console.log("allusers:",allusers[0].totalcount)
                   if(allusers[0].totalcount/10==0){
                     playerid="RL0000"+(allusers[0].totalcount+1)
}
else if(allusers[0].totalcount/10>=1 && allusers[0].totalcount/10<=9){
playerid="RL000"+(allusers[0].totalcount+1)
}
else if(allusers[0].totalcount/10>=10 && allusers[0].totalcount/10<=99){
playerid="RL00"+(allusers[0].totalcount+1)
}

else if(allusers[0].totalcount/10>=100 && allusers[0].totalcount/10<=999){
playerid="RL0"+(allusers[0].totalcount+1)
}

else if(allusers[0].totalcount/10>=1000 && allusers[0].totalcount/10<=9999){
playerid="RL"+(allusers[0].totalcount+1)
}
console.log("playerId",playerid)
*/
            const formData = {
                first_name: full_name,
                email: email,
                password: password,
                // player_id:playerid,


            };
            let sql = `SELECT * FROM users WHERE LOWER(email)= ? limit ?`;
            let user = await conn.query(sql, [formData.email.toLowerCase(), 1]);
            if (user.length > 0) {
                statusCode = 201
                message = 'Sorry! Email already exist try another email'
            } else {
                const sql1 = `INSERT INTO users set ?`;
                const users = await conn.query(sql1, formData)
                if (users) {
                    statusCode = 200
                    message = "User created success"
                    register = true
                } else {
                    statusCode = 500
                    message = "Something went wrong! database error"
                }
            }
        }


        const responseData = {
            status: statusCode,
            message,
            register,

        }
        res.send(responseData)

    } catch (error) {
        res.send({ error: error })
    }
}

const adduserbyadmin1 = async (req, res) => {
    let message = null
    let register = false

    let statusCode = 400
    try {

        const { first_name, full_name,email, password, role_id } = req.body

        const encryptedPassword = password
        const formData = {
            first_name: first_name,
            first_name: full_name,
            email: email,
            password: encryptedPassword,
            role_id: 2 ,

        };

        // Check requeted user is exist or not
        if (role_id == 2) {
            let sql = `SELECT * FROM users WHERE LOWER(email)= ? limit ?`;
            let user = await conn.query(sql, [formData.email.toLowerCase(), 1]);
            if (user.length > 0) {
                statusCode = 201
                message = 'Sorry! Email already exist try another email'
            } else {
                const sql1 = `INSERT INTO users set ?`;
                const users = await conn.query(sql1, formData)
                if (users) {
                    statusCode = 200
                    message = "SuperMaster created success"
                    register = true
                } else {
                    statusCode = 500
                    message = "Something went wrong! database error"
                }
            }
        }
      

        if (role_id == 3) {
            let sql = `SELECT * FROM masterid WHERE LOWER(email)= ? limit ?`;
            let user = await conn.query(sql, [formData.email.toLowerCase(), 1]);
            if (user.length > 0) {
                statusCode = 201
                message = 'Sorry! Email already exist try another email'
            } else {
                const sql1 = `INSERT INTO masterid set ?`;
                const users = await conn.query(sql1, formData)
                if (users) {
                    statusCode = 200
                    message = "MasterId created success"
                    register = true
                } else {
                    statusCode = 500
                    message = "Something went wrong! database error"
                }
            }
        }


        // if (role_id == 3) {
        //     let sql = `SELECT * FROM masterid WHERE LOWER(email)= ? limit ?`;
        //     let user = await conn.query(sql, [formData.email.toLowerCase(), 1]);
        //     if (user.length > 0) {
        //         statusCode = 201
        //         message = 'Sorry! Email already exist try another email'
        //     } else {
        //         const sql1 = `INSERT INTO masterid set ?`;
        //         const users = await conn.query(sql1, formData)
        //         if (users) {
        //             statusCode = 200
        //             message = "MasterId created success"
        //             register = true
        //         } else {
        //             statusCode = 500
        //             message = "Something went wrong! database error"
        //         }
        //     }
        // }

        


    
        if (role_id == 4) {
            const formData = {
                first_name: full_name,
                email: email,
                password: password,
                // player_id:playerid,


            };
            // let sql = `SELECT * FROM users WHERE LOWER(email)= ? limit ?`;
            let sql = `SELECT * FROM users WHERE LOWER(email) = ? AND role_id = 0 LIMIT ?`;

            let user = await conn.query(sql, [formData.email.toLowerCase(), 1]);
            if (user.length > 0) {
                statusCode = 201
                message = 'Sorry! Email already exist try another email'
            } else {
                const sql1 = `INSERT INTO users set ?`;
                const users = await conn.query(sql1, formData)
                if (users) {
                    statusCode = 200
                    message = "User created success"
                    register = true
                } else {
                    statusCode = 500
                    message = "Something went wrong! database error"
                }
            }
        }


        const responseData = {
            status: statusCode,
            message,
            register,

        }
        res.send(responseData)

    } catch (error) {
        res.send({ error: error })
    }
}

async function getRoleIdFromEmail(request, response) {
    try {
      const email = request.body.email;
      // Search in users table
      const userQuery = 'SELECT `role_id` FROM users WHERE `email` = ?';
  
      const userResults = await conn.query(userQuery, [email]);
  
      if (userResults.length > 0 && userResults[0].role_id !== null) {
        const roleId = userResults[0].role_id;
        response.send({ roleId });
      } else {
        // Search in supermaster table
        const supermasterQuery = 'SELECT `role_id` FROM supermaster WHERE `email` = ?';
        const supermasterResults = await conn.query(supermasterQuery, [email]);
  
        if (supermasterResults.length > 0 && supermasterResults[0].role_id !== null) {
          const roleId = supermasterResults[0].role_id;
          response.send({ roleId });
        } else {
          response.send({ roleId: null });
        }
      }
    } catch (error) {
      console.error('Error occurred while executing queries:', error);
      response.send({ error: 'An error occurred' });
    }
  }





module.exports = {
    authLogin,
    authSignUp,
    //forgotPassword,
    resetPassword,
    adduserbyadmin,
    isAlreadyLoggedin,
    adduserbyadmin1,
    getRoleIdFromEmail,
    forceloginDeviceId
}
