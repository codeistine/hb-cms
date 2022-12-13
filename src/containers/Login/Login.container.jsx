import React from 'react';
import { 
    FormControl,
    TextField,
    Button,
    makeStyles,
} from '@material-ui/core';
import { Redirect} from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions/index';
import ScaleLoader from 'react-spinners/ScaleLoader';

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginBottom: '1.2rem',
    },
    inputs: {
        fontSize: '1.3rem'
    },
    label: {
        fontSize: '1.2rem'
    },
    button: {
        marginTop: '1.2rem',
        height: '3.5rem',
        fontSize: '1.5rem',
        fontFamily: "Open Sans', sans-serif",

    }
}));


const Login = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const authLoading = useSelector(state => state.hanepbuhayAuthenticator.authLoading);
    const auth = useSelector(state => state.hanepbuhayAuthenticator.hanepbuhayAuth);
    const classes = useStyles();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        const credentials = JSON.stringify({
            username: data.username,
            password: data.password
        })
        dispatch(actions.onHanepbuhayAuth(credentials));
        window.sessionStorage.setItem("user", data.username);
    };

    const authLoader = <ScaleLoader />

    const redirect = auth ? <Redirect to='/home'/> : null
    return (
        <div className="Login">
        {redirect}
            <div className="Login__form-container">
               <div className="Login__illustration"></div>
               <div className="Login__form--container">
                  <h4 className="Login__form--heading">Welcome to HanepBuhay CMS</h4>
                  {authLoading ? authLoader :
                    <form onSubmit={handleSubmit(onSubmit)} className="Login__form">
                    <FormControl className={classes.formControl}>
                        <Controller
                        control={control}
                        name="username"
                        rules={{ required: true }}
                        className={classes.inputs}
                        render={({ field }) => 
                        <TextField {...field} 
                        type="text" 
                        placeholder="username" 
                        label="username" 
                        InputProps={{className: 'Login__form--input', classes: { input: classes.inputs }}}
                        InputLabelProps={{ classes: { root: classes.label }}}
                        />}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <Controller
                        control={control}
                        name="password"
                        type="password"
                        className={classes.inputs}
                        render={({ field }) => 
                        <TextField {...field} 
                        type="password" 
                        placeholder="password" 
                        label="password" 
                        InputProps={{classes: { input: classes.inputs }}} 
                        InputLabelProps={{ classes: { root: classes.label }}}/>}
                        />
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" className={classes.button}> LOG IN </Button>
                </form>
                }
               </div>
            </div> 
        </div>
    )
};

export default Login;
