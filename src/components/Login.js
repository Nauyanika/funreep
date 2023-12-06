import React, { useState } from 'react';
import { Button, Grid, Paper, TextField } from '@material-ui/core'
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import logo from '../image/DvsT.jpg';
import { useHistory } from "react-router-dom"
import "../style/Login.css"
// import { Link } from 'react-router-dom'
import axios from "axios"
import { apiBaseURL } from '../config';
import PropTypes from 'prop-types';

const Login = ({ setToken }) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const [error, seterrorMsg] = useState(false);
    const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password} = values;
        const user = { email, password };
        await axios.post(`${apiBaseURL}/auth/login`, user).then(function (response) {
            if (response.data.status === 200) {
                setToken(response.data.token);
                seterrorMsg(response.data.message)
            } else {
                seterrorMsg(response.data.message)
            }
        })
            .catch(function (error) {
                history.push("/login")
            });

    };

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
    };



    return (
        <div >
        <div className="boxStyle d-flex justify-content-center">
              <img src="logo6.png" width="170" height="150" alt='Bigwinner' />
            </div> 
            <form onSubmit={handleSubmit}>
                <Grid>
                    <Paper elevation={15} className="paperStyle">
                        <Grid align='center'>
                            <h4>Sign In to start your session</h4>
                        </Grid>

                        <div className="">
                            <TextField
                                className="my-4 d-flex justify-content-center"
                                id="outlined-basic1"
                                label="Email or Username"
                                value={values.email}
                                onChange={handleChange('email')}
                                name='email'
                                type='text'
                                placeholder='Email or UserId'
                                variant="standard" />
                        </div>
                        <div className="">
                            <TextField
                                className="my-2 d-flex justify-content-centered"
                                id="outlined-basic"
                                label="Password"
                                name='password'
                                value={values.password}
                                onChange={handleChange('password')}
                                type='password'
                                variant="standard" />
                        </div>
                        {/* <div className="my-2">
                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                            </FormGroup>
                        </div> */}


                        <Button
                            type="submit"
                            className="my-2"
                            variant="contained"
                            color="primary"
                            fullWidth

                        >Sign In
                        </Button>
                        <div className="my-5"> {error ?
                            <div class="alert alert-warning" role="alert">
                                {error ? error : ''}
                            </div> : ''
                        }
                        </div>
                    </Paper>
                </Grid>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};
export default Login