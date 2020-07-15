import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {userActions} from '../_actions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {create} from 'jss';
import rtl from 'jss-rtl';
import {ThemeProvider, createMuiTheme, makeStyles, StylesProvider, jssPreset} from '@material-ui/core/styles';
import GreenCar from '../assets/images/car-green.svg';

const theme = createMuiTheme({
    direction: 'rtl',
    typography: {
        fontFamily: 'yekan',
        textAlign: 'right',
        fontSize: '20px',
    },
    palette: {
        primary: {
            main: '#0fa083',

        },
        secondary: {
            light: '#0066ff',
            main: '#0044ff',
            contrastText: '#ffcc00',
        },
    },
});

// Configure JSS
const jss = create({plugins: [...jssPreset().plugins, rtl()]});

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        textAlign: 'right',
        overflow: 'hidden',
    },
    image: {
        width: '45%',
        float: 'right',
        marginTop: '15%',
    },
    title: {
        marginTop: '5%',
        marginBottom: '5%',
        textAlign: 'center',
    },
    paper: {
        height: '100%',
        margin: theme.spacing(8, 4),
        marginRight: '5%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
    },
    mainWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    formWrapper: {
        width: '35%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flexStart',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    [theme.breakpoints.down('md')]: {
        paper: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        mainWrapper: {
            flexDirection: 'column',
            alignItems: 'center',
        },
        formWrapper: {
            width: '90%',
            marginTop: '20%',
        },
        form:{
          fontSize:'30px!important'
        },
        image: {
            width: '85%',
            marginTop: '20%',
        },
        title:{
            fontSize: '3rem!important'
        }
    }
}));

export function LoginPage() {
    const [inputs, setInputs] = useState({
        mobile: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const {mobile, password} = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const classes = useStyles();


    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const {name, value} = e.target;
        setInputs(inputs => ({...inputs, [name]: value}));
    }

    function handleValidation() {
        let fields = inputs;
        let errors = {};
        let formIsValid = true;

        //mobile
        if (!fields["mobile"]) {
            formIsValid = false;
            errors["mobile"] = "این فیلد الزامی است";
        } else {
            errors["mobile"] = "";
        }


        //password
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "این فیلد الزامی است";
        } else {
            errors["password"] = "";
        }

        setErrors(errors);
        return formIsValid;
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (handleValidation()) {
            dispatch(userActions.login(mobile, password));
        }
    }

    return (
        <StylesProvider jss={jss}>
            <CssBaseline/>
            <ThemeProvider theme={theme}>
                <Grid container component="main" className={classes.root}>
                    <CssBaseline/>
                    <Grid item xs={12} sm={12} md={12} component={Paper} elevation={12} square>
                        <div className={classes.paper}>
                            <h2 className={classes.title}>سامانه مقایسه و خرید آنلاین بیمه</h2>
                            <div className={classes.mainWrapper}>
                                <div className={classes.formWrapper}>
                                    <Typography component="h1" variant="h5">
                                        ورود به سامانه
                                    </Typography>
                                    <form className={classes.form} onSubmit={handleSubmit}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="mobile"
                                            label="شماره موبایل"
                                            name="mobile"
                                            type='tel'
                                            autoFocus
                                            value={mobile}
                                            onChange={handleChange}
                                        />
                                        {errors.mobile &&
                                        <span className='text-danger'>{errors.mobile}</span>}
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            name="password"
                                            label="رمزعبور"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            value={password}
                                            onChange={handleChange}
                                        />
                                        {errors.password &&
                                        <span className='text-danger'>{errors.password}</span>}
                                        <Grid className='d-flex justify-content-between align-items-center'>
                                            <div className='d-flex align-items-center'>
                                                حساب کاربری ندارید؟
                                                <Link to="/register" className="btn btn-link">ثبت نام</Link>
                                            </div>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className={classes.submit + ' rounded-pill px-5'}
                                            >
                                                ورود
                                            </Button>
                                        </Grid>
                                    </form>
                                </div>
                                <img src={GreenCar} alt='greenCar' className={classes.image}/>
                            </div>

                        </div>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </StylesProvider>
    );
}

