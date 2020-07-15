// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
//
// import { userActions } from '../_actions';
//
// function HomePage() {
//     const users = useSelector(state => state.users);
//     const user = useSelector(state => state.authentication.user);
//     const dispatch = useDispatch();
//
//     useEffect(() => {
//         dispatch(userActions.getAll());
//     }, []);
//
//     function handleDeleteUser(id) {
//         dispatch(userActions.delete(id));
//     }
//
//     return (
//         <div className="col-lg-8 offset-lg-2">
//             <h1>Hi {user.firstName}!</h1>
//             <p>You're logged in with React Hooks!!</p>
//             <h3>All registered users:</h3>
//             {users.loading && <em>Loading users...</em>}
//             {users.error && <span className="text-danger">ERROR: {users.error}</span>}
//             {users.items &&
//                 <ul>
//                     {users.items.map((user, index) =>
//                         <li key={user.value}>
//                             {user.firstName + ' ' + user.lastName}
//                             {
//                                 user.deleting ? <em> - Deleting...</em>
//                                 : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
//                                 : <span> - <a onClick={() => handleDeleteUser(user.value)} className="text-primary">Delete</a></span>
//                             }
//                         </li>
//                     )}
//                 </ul>
//             }
//             <p>
//                 <Link to="/login">Logout</Link>
//             </p>
//         </div>
//     );
// }
//
// export { HomePage };

import React, {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import {createMuiTheme, jssPreset, makeStyles, StylesProvider, ThemeProvider} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import {useDispatch, useSelector} from 'react-redux';
import {userActions} from '../_actions';
import UserSvg from '../assets/images/user.svg';
import GreenCar from '../assets/images/car-green.svg';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Insurance from '../assets/images/insurance.svg'
import {create} from "jss";
import rtl from "jss-rtl";
import {ChevronLeft, ChevronRight} from "@material-ui/icons";
import CarTypeSelect from "./CarTypeSelect";
import CarModelSelect from "./CarModelSelect";
import LastInsurmentSelect from "./LastInsurmentSelect";
import SalesPercentageSelect from "./salesPercentageSelect";
import DriverPercentageSelect from "./DriverPercentageSelect";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const theme = createMuiTheme({
    direction: 'rtl',
    typography: {
        fontFamily: 'yekan!important',
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
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    root: {
        height: '90vh',
    },
    appBar: {
        height: '10vh',
        // borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
    },
    toolbarTitle: {
        flexGrow: 1,
        textAlign: 'center',
        position: 'absolute',
        width: '100%',
        right: '0',
    },
    link: {
        margin: theme.spacing(1, 1.5),
        marginLeft: '20px',
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    userSvg: {
        width: '20px',
        marginLeft: '10px',
        verticalAlign: '-35%',
    },
    image: {
        width: '100%',
        marginBottom: '5%',
        marginTop: '15%',
        marginRight: '10%',
    },
    wrapper: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageWrapper: {
        height: '100%',
        display: 'flex',
        alignItems: 'flex-end'
    },
    navigateBar: {
        width: '100%',
        marginTop: '40px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    selectButton: {
        display: 'flex',
        flexDirection: 'column',
        width: '100px',
        height: '100px',
    },
    selectIcon: {
        width: '50%'
    },
    disabled: {
        filter: 'opacity(.5)',
    },
    selectWrapper: {
        display:'flex',
        justifyContent:'start',
        marginTop: '10%',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalPaper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    [theme.breakpoints.down('sm')]: {
        wrapper: {
            height: '50%',
        },
        imageWrapper: {
            height: '50%',
        },
        image: {
            margin: '0',
            marginBottom: '10%',
        },
        link: {
            margin: '0',
        },
        selectWrapper:{
            justifyContent:'center',
        }
    }
}));

function getSteps() {
    return ['Select campaign settings', 'Create an ad group', 'Create an ad', 'test'];
}

export function HomePage() {
    const classes = useStyles();
    const user = useSelector(state => state.authentication.user);
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const dispatch = useDispatch();
    const [carType, setCarType] = useState('');
    const [carModel, setCarModel] = useState('');
    const [lastCompany, setLastCompany] = useState('');
    const [salesPercentage, setSalesPercentage] = useState('');
    const [driverPercentage, setDriverPercentage] = useState('');
    const [error, setError] = useState('');
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNext = () => {
        if (activeStep === 1 && (carType === '' || carModel === '')) {
            setError('انتخاب هر دو فیلد الزامی است');
            return;
        } else if (activeStep === 2 && lastCompany === '') {
            setError('این فیلد الزامی است');
            return;
        }
        setError('')
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = () => {
        if (salesPercentage === '' || driverPercentage === '') {
            setError('انتخاب هردو فیلد الزامی است');
            return;
        }
        setError('');
        handleOpen();
    }

    const handleCarType = (value) => {
        console.log(value);
        setCarType(value);
    }

    const handleCarModel = (value) => {
        console.log(value);
        setCarModel(value);
    }

    const handleLastCompany = (value) => {
        console.log(value);
        setLastCompany(value);
    }

    const handleSalesPercentage = (value) => {
        console.log(value);
        setSalesPercentage(value);
    }

    const handleDriverPercentage = (value) => {
        console.log(value);
        setDriverPercentage(value);
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <Grid container className={classes.selectWrapper}>
                        <Typography variant='h1' className='text-center text-md-right mb-4' style={{width: '100%'}}>انتخاب
                            بیمه</Typography>
                        <Button variant='outlined' className={classes.selectButton} onClick={handleNext}>
                            <div className='d-flex flex-column justify-content-center align-items-center'>
                                <img src={Insurance} alt="insurance" className={classes.selectIcon}/>
                                <span className='mt-2'>شخض ثالث</span>
                            </div>
                        </Button>
                        <Button variant='outlined' className={classes.selectButton + ' mr-4'} style={{opacity: '.5'}}
                                disabled>
                            <div className='d-flex flex-column justify-content-center align-items-center'>
                                <img src={Insurance} alt="insurance" className={classes.selectIcon}/>
                                <span className='mt-2'>بیمه بدنه</span>
                            </div>
                        </Button>
                    </Grid>
                );
            case 1:
                return (
                    <Grid container className={classes.selectWrapper}>
                        <Typography variant='h1' className='text-center text-md-right mb-4' style={{width: '100%'}}>بیمه شخص
                            ثالث</Typography>
                        <span className='text-right mb-4'
                              style={{width: '100%'}}>نوع و مدل خودروی خود را انتخاب کنید</span>
                        <Grid md={6} sm={12} xs={12} className='pl-md-2'>
                            <CarTypeSelect id={carType.value} func={handleCarType}/>
                        </Grid>
                        <Grid md={6} sm={12} xs={12} className='mt-2 mt-md-0 pr-md-2'>
                            <CarModelSelect id={carModel.value} func={handleCarModel}/>
                        </Grid>
                        {error !== '' && <span className='text-danger'>{error}</span>}
                    </Grid>
                );
            case 2:
                return (
                    <Grid container className={classes.selectWrapper}>
                        <Typography variant='h1' className='text-center text-md-right mb-4' style={{width: '100%'}}>بیمه شخص
                            ثالث</Typography>
                        <span className='text-right mb-4' style={{width: '100%'}}>شرکت بیمه گر قبلی خود را در این بخش وارد کنید</span>
                        <Grid md={12} sm={12} xs={12}>
                            <LastInsurmentSelect id={lastCompany.value} func={handleLastCompany}/>
                        </Grid>
                        {error !== '' && <span className='text-danger'>{error}</span>}
                    </Grid>
                );
            case 3:
                return (
                    <Grid container className={classes.selectWrapper}>
                        <Typography variant='h1' className='text-center text-md-right mb-4' style={{width: '100%'}}>بیمه شخص
                            ثالث</Typography>
                        <span className='text-right mb-4' style={{width: '100%'}}>درصد تخفیف تخفیف بیمه شخص ثالث و حوادث راننده را وارد کنید</span>
                        <Grid md={12} sm={12} xs={12}>
                            <SalesPercentageSelect id={salesPercentage.value} func={handleSalesPercentage}/>
                        </Grid>
                        <Grid md={12} sm={12} xs={12} className='mt-2'>
                            <DriverPercentageSelect id={driverPercentage.value} func={handleDriverPercentage}/>
                        </Grid>
                        {error !== '' && <span className='text-danger'>{error}</span>}
                    </Grid>
                );
            default:
                return (
                    <Grid container className={classes.selectWrapper}>
                        <Typography variant='h1' className='text-center text-md-right mb-4' style={{width: '100%'}}>انتخاب
                            بیمه</Typography>
                        <Button variant='outlined' className={classes.selectButton} onClick={handleNext}>
                            <div className='d-flex flex-column justify-content-center align-items-center'>
                                <img src={Insurance} alt="insurance" className={classes.selectIcon}/>
                                <span className='mt-2'>شخض ثالث</span>
                            </div>
                        </Button>
                        <Button variant='outlined' className={classes.selectButton + ' mr-4'} style={{opacity: '.5'}}
                                disabled>
                            <div className='d-flex flex-column justify-content-center align-items-center'>
                                <img src={Insurance} alt="insurance" className={classes.selectIcon}/>
                                <span className='mt-2'>بیمه بدنه</span>
                            </div>
                            {error !== '' && <span className='text-danger'>{error}</span>}
                        </Button>
                    </Grid>
                );
        }
    }

    return (
        <StylesProvider jss={jss}>
            <CssBaseline/>
            <ThemeProvider theme={theme}>
                <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                            سامانه مقایسه و خرید آنلاین بیمه
                        </Typography>
                        <Typography className={classes.link}>
                            <img src={UserSvg} alt="user" className={classes.userSvg}/>
                            <span className='d-none d-md-inline-block'>{user.firstName + ' ' + user.lastName}</span>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container component="main">
                    <Grid container spacing={12} alignItems="flex-end" className={classes.root}>
                        <Grid item xs={12} sm={12} md={5} className={classes.wrapper}>
                            <div style={{height: '100%', width: '100%'}}>
                                {getStepContent(activeStep)}
                                {activeStep !== 0 &&
                                <div className={classes.navigateBar}>
                                    <Button variant="outlined"
                                            color="primary"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            className={classes.button + ' rounded-pill'}>
                                        <ChevronRight/>
                                        مرحله قبل
                                    </Button>
                                    {activeStep === steps.length - 1 ?
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.button + ' rounded-pill'}
                                            onClick={handleSubmit}
                                        >
                                            استعلام قیمت
                                        </Button>
                                        :
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button + ' rounded-pill'}
                                        >
                                            مرحله بعد
                                            <ChevronLeft/>
                                        </Button>
                                    }

                                </div>}
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={7} className={classes.imageWrapper}>
                            <img src={GreenCar} alt='greenCar' className={classes.image}/>
                        </Grid>
                    </Grid>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <div className={classes.modalPaper + ' text-right'}>
                                <h2 id="transition-modal-title" className='text-center'>موارد انتخابی شما</h2>
                                <h5 id="transition-modal-description"><strong className='text-primary'>نوع
                                    بیمه: </strong> شخص ثالث</h5>
                                <h5 id="transition-modal-description"><strong className='text-primary'>نوع
                                    خودرو: </strong>{carType.label}</h5>
                                <h5 id="transition-modal-description"><strong className='text-primary'>مدل
                                    خودرو: </strong>{carModel.label}</h5>
                                <h5 id="transition-modal-description"><strong className='text-primary'>بیمه گر
                                    قبلی: </strong>{lastCompany.label}</h5>
                                <h5 id="transition-modal-description"><strong className='text-primary'>درصدتخفیف
                                    ثالث: </strong>{salesPercentage.label}</h5>
                                <h5 id="transition-modal-description"><strong className='text-primary'>درصدتخفیف
                                    راننده: </strong>{driverPercentage.label}</h5>
                            </div>
                        </Fade>
                    </Modal>
                </Container>
            </ThemeProvider>
        </StylesProvider>
    );
}
