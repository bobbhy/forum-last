import React, { useState, initialState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import authService from "../../services/authService";
import Alert from "@material-ui/lab/Alert";
import hihi from "../../hihi.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  image: {
    backgroundImage: `url(${hihi})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login({ user, userInfo }) {
  const history = useHistory();
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [message, setMessage] = useState(initialState);
  const [loading, setLoading] = useState(initialState);
  useEffect(() => {
    if (user && userInfo?.roles[0]?.id !== 2) {
      history.push("/profile");
    } else if (user && userInfo?.roles[0]?.id === 2) {
      history.push("/admin");
    }
  });
  const handleChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    if (password?.length === 0) {
      setErrors({ ...errors, password: "Mot de passe est obligatoire " });
    } else {
      setErrors({ ...errors, password: null });
      if (password?.length < 8)
        setErrors({
          ...errors,
          password: "Mot de passe doit contenir au moin 8 caracteres",
        });
    }
  };
  const handleChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
    if (username?.length === 0) {
      setErrors({ ...errors, username: "Pseudo ou adresse email sont obligatoires" });
    } else {
      setErrors({ ...errors, username: null });
      if (username?.length < 3)
        setErrors({
          ...errors,
          username: "Pseudo ou adresse email doit contenir au moin 3 caracteres",
        });
    }
  };
  const handLogin = (e) => {
    e.preventDefault();
    if (!Object.values(errors).some((x) => x !== null && x !== "")) {
      setLoading(true);
      setMessage("");
      const usernamex = username?.toLowerCase();
      authService.login(usernamex, password).then(
        () => {
          history.push("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setMessage(resMessage);
            setLoading(false);     
        }
      );
    } else {
      setLoading(false);
    }
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        {loading && (
          <div className={classes.root}>
            <LinearProgress />
          </div>
        )}
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Se connecter
          </Typography>
          <form className={classes.form} onSubmit={handLogin}>
            <TextField
              value={username}
              onChange={handleChangeUsername}
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              required={true}
              label="Pseudo Ou Adresse Email"
              name="email"
              autoComplete="email"
              autoFocus
              error={Boolean(errors?.username)}
              helperText={errors?.username}
            />
            <TextField
              value={password}
              onChange={handleChangePassword}
              variant="outlined"
              margin="normal"
              required={true}
              fullWidth
              name="password"
              label="Mot De Passe"
              type="password"
              id="password"
              autoComplete="current-password"
              error={Boolean(errors?.password)}
              helperText={errors?.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Se souvenir de moi"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Se connecter
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/register");
                  }}
                  variant="body2"
                >
                  {"Vous n'avez pas un compte? S'inscrire"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        {message && (
          <Alert
            severity="error mx-4"
            onClose={() => {
              setMessage(null);
            }}
          >
            {message}
          </Alert>
        )}
      </Grid>
    </Grid>
  );
}
