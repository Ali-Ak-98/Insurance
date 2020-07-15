import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {userActions} from '../_actions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {ThemeProvider, createMuiTheme, makeStyles, StylesProvider, jssPreset} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {create} from "jss";
import rtl from "jss-rtl";
import Paper from "@material-ui/core/Paper";
import GreenCar from "../assets/images/car-green.svg";


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
        marginTop: theme.spacing(2),
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
        form: {
            fontSize: '30px!important'
        },
        image: {
            width: '85%',
            marginTop: '20%',
        },
        title: {
            fontSize: '3rem!important'
        }
    }
}));

export function RegisterPage() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [errors, setErrors] = useState({});

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const {name, value} = e.target;
        setUser(user => ({...user, [name]: value}));
    }

    function handleValidation() {
        let fields = user;
        let errors = {};
        let formIsValid = true;

        //firstName
        if (!fields["firstName"]) {
            formIsValid = false;
            errors["firstName"] = "این فیلد الزامی است";
        } else if (typeof fields["firstName"] !== "undefined") {
            if (!fields["firstName"].match(/^[\u0600-\u06FF\s]+$/)) {
                formIsValid = false;
                errors["firstName"] = "فقط حروف فارسی مجاز است";
            }
        } else {
            errors["firstName"] = "";
        }


        //lastName
        if (!fields["lastName"]) {
            formIsValid = false;
            errors["lastName"] = "این فیلد الزامی است";
        } else if (typeof fields["lastName"] !== "undefined") {
            if (!fields["lastName"].match(/^[\u0600-\u06FF\s]+$/)) {
                formIsValid = false;
                errors["lastName"] = "فقط حروف فارسی مجاز است";
            }
        } else {
            errors["lastName"] = "";
        }


        //mobile
        if (!fields["mobile"]) {
            formIsValid = false;
            errors["mobile"] = "این فیلد الزامی است";
        } else if (typeof fields["lastName"] !== "undefined") {
            if (!fields["mobile"].match(/^(?=[0-9]{11}$).*/)) {
                formIsValid = false;
                errors["mobile"] = "لطفا ۱۱ کارکتر وارد کنید";
            }
        } else {
            errors["mobile"] = "";
        }


        //password
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "این فیلد الزامی است";
        } else if (typeof fields["password"] !== "undefined") {
            if (!fields["password"].match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/)) {
                formIsValid = false;
                errors["password"] = "پسورد باید شامل حروف بزرک لاتین حروف کوچیک لاتین و عدد باشد.";
            } else if (!fields["password"].match(/^.{4,10}$/)) {
                formIsValid = false;
                errors["password"] = "پسورد باید حداقل ۴ کاراکتر و حداکثر ۱۰ کاراکتر باشد";
            }
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
            dispatch(userActions.register(user));
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
                                        ثبت نام
                                    </Typography>
                                    <form className={classes.form} onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    autoComplete="fname"
                                                    name="firstName"
                                                    variant="outlined"
                                                    fullWidth
                                                    id="firstName"
                                                    label="نام"
                                                    value={user.firstName}
                                                    onChange={handleChange}
                                                    autoFocus
                                                />
                                                {errors.firstName &&
                                                <span className='text-danger'>{errors.firstName}</span>}
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth
                                                    id="lastName"
                                                    label="نام خانوادگی"
                                                    name="lastName"
                                                    autoComplete="lname"
                                                    value={user.lastName}
                                                    onChange={handleChange}
                                                />
                                                {errors.lastName &&
                                                <span className='text-danger'>{errors.lastName}</span>}
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth
                                                    id="mobile"
                                                    label="شماره موبایل"
                                                    name="mobile"
                                                    type='number'
                                                    autoComplete="mobile"
                                                    value={user.mobile}
                                                    onChange={handleChange}
                                                />
                                                {errors.mobile &&
                                                <span className='text-danger'>{errors.mobile}</span>}
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth
                                                    name="password"
                                                    label="رمزعبور"
                                                    type="password"
                                                    id="password"
                                                    autoComplete="current-password"
                                                    value={user.password}
                                                    onChange={handleChange}
                                                />
                                                {errors.password &&
                                                <span className='text-danger'>{errors.password}</span>}
                                            </Grid>
                                        </Grid>
                                        <Grid className='d-flex justify-content-between align-items-center'>
                                            <div className='d-flex align-items-center'>
                                                قبلا ثبت نام کردید؟
                                                <Link to="/login" className="btn btn-link">ورود</Link>
                                            </div>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className={classes.submit + ' rounded-pill px-5'}
                                            >
                                                ثبت نام
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


