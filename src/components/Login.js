import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { WhiteButton } from './Buttons'
import logo from '../logo/logo-wc.png'
import GoogleIcon from '@mui/icons-material/Google';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles((theme) =>({
    backgroundContainer: {
        minWidth: '100vw',
        minHeight: '100vh',
    },
    overlay: {
        width: '100vw',
        height: '100vh',
        backgroundImage: 'linear-gradient(to bottom, rgba(80,101,168,1)0%, rgba(80,101,168,1)50%, rgba(80,101,168,1)100%)',
        //backgroundColor: "#f5f3ee",
        textAlign: 'center'
    },
    logoImg: {
        width: '80px',
        position: 'relative',
        top: '20px'
    },
    formContainer: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '50px',
        width: '90%',
        maxWidth: '400px',
        //backgroundImage: 'linear-gradient(to bottom, rgba(80,101,168,1)0%, rgba(80,101,168,1)50%, rgba(80,101,168,1)100%)',
        borderRadius: "25px",
        //boxShadow: '0 3px 5px 2px rgba(32,40,67,1)',
    },
    passwordInput: {
        flex: '1',
        width: '100%',
        padding: '15px',
        outline: 'none',
        borderRadius: '25px',
        border: 'none',
        background: "none",
        color: 'white',
        fontSize: '18px',
        '&::placeholder': {
            color: 'rgba(255,255,255,0.75)'
        }
    },
    userInput: {
        width: '100%',
        padding: '15px',
        outline: 'none',
        borderRadius: '25px',
        border: 'none',
        marginBottom: '20px',
        background: "rgba(255,255,255,0.25)",
        color: 'white',
        fontSize: '18px',
        '&::placeholder': {
            color: 'rgba(255,255,255,0.75)'
        }
    },
    passwordContainer: {
        display: 'flex',
        width: '100%',
        background: 'rgba(255,255,255,0.25)',
        borderRadius: '25px',
        border: 'none',
        marginBottom: '20px',
    },
    errorContainer: {
        background: 'rgba(255,255,255,0.25)',
        borderRadius: 10,
        padding: 20,
        marginTop: 20
    },
    errorText: {
        color: 'white',
        fontSize: '25px'
    },
    link: {
        color: 'white',
        '&:hover': {
            color: 'white'
        },
        fontSize: '15px',
    },
    loaderContainer:  {
        margin: 'auto',
        width: 80,
        paddingTop: '30px'
    },
    logo: {
        padding: 50,
        width: "300px",
    },
    icon: {
        padding: 5,
    },
    signup:{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '50px',
        width: '90%',
        maxWidth: '400px',
        backgroundImage: 'linear-gradient(to bottom, rgba(80,101,168,1)0%, rgba(80,101,168,1)50%, rgba(80,101,168,1)100%)',
        borderRadius: "25px",
        boxShadow: '0 3px 5px 2px rgba(32,40,67,1)',
    }
}))

  
export default function Login ({classes}){
    classes = useStyles();
    
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
    });

    const {email, password, showPassword } = values;

    const handleChange = name => (e) => {
        setValues({...values, [name]: e.target.value});
    };

    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const {data} = await axios.post('/api/signin', {
                email,
                password
            });
            console.log(data);

            if(data.success === true){
                setValues({email: '', password: ''});
                toast.success("Login succesfully!");
                navigate('/');
            }

        }catch(err){
            console.log(err.response.data.error);
            toast.error(err.response.data.error);
        }
    }


    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };


    return (
        <div className={classes.backgroundContainer}>
        <div className={classes.overlay}>
            <div className={classes.formContainer}>
            <img className={classes.logo} src={logo}></img>
                <div style={{display: 'flex'}}>
                    <input 
                        type="text" 
                        placeholder="Correo electrónico"
                        className={classes.userInput}
                        onChange={handleChange("email")}
                        value={email} 
                    />
                </div>
                
                <div className={classes.passwordContainer}>
                    <input 
                        type={values.showPassword ? 'text' : 'password'}
                        placeholder="Contraseña"
                        className={classes.passwordInput}
                        onChange={handleChange("password")}
                        value={password} 
                    />
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        >
                        {values.showPassword ? <Visibility  style={{color: 'white'}}/> : <VisibilityOff style={{color: 'white'}}/>}
                    </IconButton>
                </div>
                <div>
                    <WhiteButton onClick={handleSubmit}>Iniciar sesión</WhiteButton>
                </div>
                <div>
                    <p className={classes.link}>────────  o  ────────</p>
                </div>
                <div> 
                <Button sx={{ color:'#202843', fontWeight: 'bold'}} className={classes.link}>{<GoogleIcon className={classes.icon}/>} Iniciar sesión con Google </Button>
                </div>
                <div> 
                <p className={classes.link}>¿No tienes cuenta? <Link to = '/signup' style={{ textDecoration: 'none' }}><Button sx={{ color:'#202843', fontWeight: 'bold'}} className={classes.link}> Regístrate </Button> </Link></p> 
                </div>
            </div>
        </div>
    </div>
    )
}