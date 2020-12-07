import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline, Avatar, Typography, FormControlLabel, Checkbox, Button, Grid } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../../query/LOGIN'
import AlertSnackbar from "../Shared/Snackbar";
import { setUserDetails } from "../../services/localStorage.service"

// TODO: Move this to a seperate styles file based on component
const useStyles = makeStyles(theme => ({
    paper: { marginTop: theme.spacing(8), display: 'flex', flexDirection: 'column', alignItems: 'center', },
    avatar: { margin: theme.spacing(1), backgroundColor: theme.palette.secondary.main },
    form: { width: '100%', marginTop: theme.spacing(1) },
    submit: { margin: theme.spacing(3, 0, 2) },
}));


function LoginComponent() {
    let history = useHistory();
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState(false);
    const [login] = useMutation(LOGIN, { errorPolicy: 'all' });

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    async function onsubmit(e: any) {
        e.preventDefault();
        await login({ variables: { email, password } }).then((res: any) => {
            if (res.data.login.code === 200) {
                setUserDetails(res.data.login.author)
                history.push('/home')
            } else {
                setToast(true)
                setToastMessage(res.data.login.message)
            }
        }, (error) => {
            console.log(error);
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar>
                <Typography component="h1" variant="h5"> Sign in </Typography>
                <form className={classes.form} noValidate>
                    <TextField variant="outlined" margin="normal" required fullWidth label="Email Address" name="email" value={email} autoComplete="email" 
                    onChange={e => setEmail(e.target.value)} autoFocus />
                    <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" value={password} 
                    onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
                    <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                    <Button fullWidth variant="contained" color="primary" className={classes.submit} disabled={!validateForm()} onClick={e => { onsubmit(e) }}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="#forgotPassword">Forgot password?</Link>
                        </Grid>
                        <Grid item>
                            <Link to="#SignUp">{"Don't have an account? Sign Up"}</Link>
                        </Grid>
                        <AlertSnackbar open={toast} message={toastMessage} handleClose={setToast}/>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default LoginComponent;