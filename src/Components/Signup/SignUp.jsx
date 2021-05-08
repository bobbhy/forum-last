import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import authService from "../../services/authService";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import login from "../../login.jfif";
import userService from "../../services/userService";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    flexGrow: 1,
  },
  tab: {
    width: "50%",
  },
  paper: {
    margin: theme.spacing(0, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  typo: {
    marginTop: "2vh",
    marginBottom: "2vh",
  },
  image: {
    backgroundImage: `url(${login})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
}));
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default function SignUp({ user }) {
  const history = useHistory();
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("");
  const [successful, setSuccessful] = useState("");
  const [value, setValue] = useState(0);
  const [etablishments, setEtablishments] = useState([]);
  const [etablishment, setEtablishment] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (user) {
      history.push("/profile");
    }
    async function getEtablishments() {
      await userService.getEtablishements().then((response) => {
        setEtablishments(response.data);
      })
    }
    getEtablishments();
  }, []);
  const handleChangeFirstName = (e) => {
    const firstName = e.target.value;
    setFirstName(firstName);
    if (firstName.length === 0) {
      setErrors({ ...errors, firstName: "First name is required" });
    } else {
      setErrors({ ...errors, firstName: null });
    }
  };
  const handleChangeLastName = (e) => {
    const lastName = e.target.value;
    setLastName(lastName);
    if (lastName.length === 0) {
      setErrors({ ...errors, lastName: "Last name is required" });
    } else {
      setErrors({ ...errors, lastName: null });
    }
  };
  const handleChangeUsername = (e) => {
    const userName = e.target.value;
    setUserName(userName);
    if (userName.length === 0) {
      setErrors({ ...errors, userName: "User name is required" });
    } else {
      setErrors({ ...errors, userName: null });
      if (userName?.length < 3)
        setErrors({
          ...errors,
          userName: "User name must be equal or greater than 3",
        });
    }
  };
  const handleChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    if (email.length === 0) {
      setErrors({ ...errors, email: "Email is required" });
    } else if (!email.endsWith('@uit.ac.ma') && value === 0) {
      setErrors({ ...errors, email: "Use your university email" })
    }
    else {
      setErrors({ ...errors, email: null });
      if (!validateEmail(email)) {
        setErrors({ ...errors, email: "Invalid email format" });
      }
    }
  };
  const handleChangeEtablishment = (e) => {
    const etablishment = e.target.value;
    setEtablishment(etablishment);
    if (etablishment == 0) {
      setErrors({ ...errors, etablishment: "Etablishement is required" });
    }
    else {
      setErrors({ ...errors, etablishment: null })
    }
  };

  const handleChangeCompanyName = (e) => {
    const companyName = e.target.value;
    setCompanyName(companyName);
    if (companyName.length === 0) {
      setErrors({ ...errors, companyName: "User name is required" });
    } else {
      setErrors({ ...errors, companyName: null });
    }
  };

  const handleChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    if (password?.length === 0) {
      setErrors({ ...errors, password: "Password required" });
    } else {
      setErrors({ ...errors, password: null });
      if (password?.length < 8)
        setErrors({
          ...errors,
          password: "Password must be equal or greater than 8",
        });
    }
  };
  const handleStudentSignup = (e) => {
    e.preventDefault();
    if (etablishment == 0) {
      setErrors({ ...errors, etablishment: "Etablishement is required" });
      return 0;
    }
    setMessage("");
    setLoading(true);
    if (!Object.values(errors).some((x) => x !== null && x !== "")) {
      setLoading(true);
      const name =
        firstName.split(" ").join("").toLowerCase() +
        " " +
        lastName.split(" ").join("").toLowerCase();
      const userNamex = userName.toLowerCase();
      const emailx = email.toLowerCase();
      authService.register(name, "", userNamex, emailx, password, 1, etablishment).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          setLoading(false);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
          setLoading(false);
        }
      );
    }
    else {
      setLoading(false)
    }

  };
  const handleManagerSignup = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    if (!Object.values(errors).some((x) => x !== null && x !== "")) {
      setLoading(true);
      const name =
        firstName.split(" ").join("").toLowerCase() +
        " " +
        lastName.split(" ").join("").toLowerCase();
      const userNamex = userName.toLowerCase();
      const emailx = email.toLowerCase();
      authService
        .register(name, companyName, userNamex, emailx, password, 3)
        .then(
          (response) => {
            setMessage("Please wait for the admin to enable your account");
            setSuccessful(true);
            setLoading(false);
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setMessage(resMessage);
            setSuccessful(false);
            setLoading(false);
          }
        );
    }
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        {loading && (
          <div className={classes.root}>
            <LinearProgress />
          </div>
        )}
        <div className={classes.paper}>
          <Paper className={classes.root}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Student Registration" className={classes.tab} />
              <Tab label="Manager Registration" />
            </Tabs>
          </Paper>

          {!successful && value === 0 && (
            <>
              <Typography component="h1" variant="h5" className={classes.typo}>
                Sign up as a Student
              </Typography>
              <form
                className={classes.form}
                onSubmit={handleStudentSignup}
                Validate
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      error={Boolean(errors?.firstName)}
                      id="firstName"
                      label="First Name"
                      value={firstName
                        .split(" ")
                        .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
                        .join(" ")}
                      helperText={errors?.firstName}
                      onChange={handleChangeFirstName}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      value={lastName
                        .split(" ")
                        .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
                        .join(" ")}
                      onChange={handleChangeLastName}
                      error={Boolean(errors?.lastName)}
                      helperText={errors?.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      value={userName}
                      onChange={handleChangeUsername}
                      error={Boolean(errors?.userName)}
                      helperText={errors?.userName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="filled" xs={12} sm={6}>
                      <InputLabel id="demo-simple-select-label">Etablissement</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={etablishment}
                        onChange={handleChangeEtablishment}
                        error={Boolean(errors?.etablishment)}
                      >
                        <MenuItem value={0}>Choose Your Etablishement</MenuItem>
                        {etablishments.map((etablishment) => {
                          return (<MenuItem value={etablishment.id}>{etablishment.name}</MenuItem>)
                        })}
                      </Select>
                      <FormHelperText error={Boolean(errors?.etablishment)}>{errors?.etablishment}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={handleChangeEmail}
                      error={Boolean(errors?.email)}
                      helperText={errors?.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={password}
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      onChange={handleChangePassword}
                      autoComplete="current-password"
                      error={Boolean(errors?.password)}
                      helperText={errors?.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I agree to use my personnal information for academic researches"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        history.push("/login");
                      }}
                      variant="body2"
                    >
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </>
          )}
          {!successful && value === 1 && (
            <>
              <Typography component="h1" variant="h5" className={classes.typo}>
                Sign up as an Enterprise Manager
              </Typography>
              <form
                className={classes.form}
                onSubmit={handleManagerSignup}
                Validate
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      error={Boolean(errors?.firstName)}
                      id="firstName"
                      label="First Name"
                      value={firstName
                        .split(" ")
                        .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
                        .join(" ")}
                      helperText={errors?.firstName}
                      onChange={handleChangeFirstName}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      value={lastName
                        .split(" ")
                        .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
                        .join(" ")}
                      onChange={handleChangeLastName}
                      error={Boolean(errors?.lastName)}
                      helperText={errors?.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="username"
                      label="Company Name"
                      name="companyName"
                      autoComplete="companyName"
                      value={companyName}
                      onChange={handleChangeCompanyName}
                      error={Boolean(errors?.userName)}
                      helperText={errors?.userName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      value={userName}
                      onChange={handleChangeUsername}
                      error={Boolean(errors?.userName)}
                      helperText={errors?.userName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={handleChangeEmail}
                      error={Boolean(errors?.email)}
                      helperText={errors?.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={password}
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      onChange={handleChangePassword}
                      autoComplete="current-password"
                      error={Boolean(errors?.password)}
                      helperText={errors?.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I agre to use my data in ..."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        history.push("/login");
                      }}
                      variant="body2"
                    >
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </>
          )}
        </div>
        {message && (
          <Alert
            severity={!successful ? "error" : "success"}
            onClose={() => {
              setMessage(null);
            }}
          >
            {message}
          </Alert>
        )}
      </Grid>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
    </Grid>
  );
}
