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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Modal from "react-bootstrap/Modal";

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
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
  const [flag,setFlag]=useState(false);
  const [value, setValue] = useState(0);
  const [etablishments, setEtablishments] = useState([]);
  const [etablishment, setEtablishment] = useState(0);
  const [checked, setChecked] = useState(false);
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
      });
    }
    getEtablishments();
  }, []);
  const handleChecked=()=>{
    if(checked==false)
    {
      setFlag(false)
      setShow(true)
    }
    setChecked(!checked);
  }
  const handleChangeFirstName = (e) => {
    const firstName = e.target.value;
    setFirstName(firstName);
    if (firstName.length === 0) {
      setErrors({ ...errors, firstName: "Nom est obligatoire" });
    } else {
      setErrors({ ...errors, firstName: null });
    }
  };
  const handleChangeLastName = (e) => {
    const lastName = e.target.value;
    setLastName(lastName);
    if (lastName.length === 0) {
      setErrors({ ...errors, lastName: "Prénom est obligatoire" });
    } else {
      setErrors({ ...errors, lastName: null });
    }
  };
  const handleChangeUsername = (e) => {
    const userName = e.target.value;
    setUserName(userName);
    if (userName.length === 0) {
      setErrors({ ...errors, userName: "Pseudo est obligatoire" });
    } else {
      setErrors({ ...errors, userName: null });
      if (userName?.length < 3)
        setErrors({
          ...errors,
          userName: "Pseudo doit contenir plus de 3 caractères",
        });
      else if(userName?.length>15)
      {
         setErrors({
          ...errors,
          userName: "Pseudo doit contenir moins de 15 caractères",
        });
      }
    }
  };
  const handleChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    if (email.length === 0) {
      setErrors({ ...errors, email: "Email est obligatoire" });
    } else if (!email.endsWith("@uit.ac.ma") && value === 0) {
      setErrors({ ...errors, email: "Utilisez un email universitaire" });
    } else {
      setErrors({ ...errors, email: null });
      if (!validateEmail(email)) {
        setErrors({ ...errors, email: "Fomat invalide" });
      }
    }
  };
  const handleChangeEtablishment = (e) => {
    const etablishment = e.target.value;
    setEtablishment(etablishment);
    if (etablishment == 0) {
      setErrors({ ...errors, etablishment: "Etablissement est obligatoire" });
    } else {
      setErrors({ ...errors, etablishment: null });
    }
  };

  const handleChangeCompanyName = (e) => {
    const companyName = e.target.value;
    setCompanyName(companyName);
    if (companyName.length === 0) {
      setErrors({ ...errors, companyName: "Nom de l'entreprise est obligatoire" });
    } else {
      setErrors({ ...errors, companyName: null });
    }
  };

  const handleChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    if (password?.length === 0) {
      setErrors({ ...errors, password: "Mot de passe est obligatoire" });
    } else {
      setErrors({ ...errors, password: null });
      if (password?.length < 8)
        setErrors({
          ...errors,
          password: "Mot de passe doit etre supérieur ou égale à 8 caractères",
        });
    }
  };
  const handleStudentSignup = (e) => {
    if(checked==false)
    {
      setFlag(true)
    }
    e.preventDefault();
    if (etablishment == 0) {
      setErrors({ ...errors, etablishment: "Etablissement est obligatoire" });
      return 0;
    }
    setMessage("");
    setLoading(true);
    if (!Object.values(errors).some((x) => x !== null && x !== "") && checked) {
      setLoading(true);
      const name =
        firstName.split(" ").join("").toLowerCase() +
        " " +
        lastName.split(" ").join("").toLowerCase();
      const userNamex = userName.toLowerCase();
      const emailx = email.toLowerCase();
      authService
        .register(name, "", userNamex, emailx, password, 1, etablishment)
        .then(
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
    } else {
      setLoading(false);
    }
  };
  const handleManagerSignup = (e) => {
    if(checked==false)
    {
      setFlag(true)
    }
    e.preventDefault();
    setMessage("");
    setLoading(true);
    if (!Object.values(errors).some((x) => x !== null && x !== "") && checked) {
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
            setMessage("S'il vous plait veuillez attendre la vérification de votre identité à travers les administrateurs avant de se connecter");
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
  const [show, setShow] = useState(false);
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
              <Tab label="Etudiant" className={classes.tab} />
              <Tab label="Manager" className={classes.tab} />
            </Tabs>
          </Paper>

          {!successful && value === 0 && (
            <>
              <Typography component="h1" variant="h5" className={classes.typo}>
                S'inscrire comme étudiant
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
                      label="Nom"
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
                      label="Prénom"
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
                      label="Pseudo"
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
                      <InputLabel id="demo-simple-select-label">
                        Etablissement
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={etablishment}
                        onChange={handleChangeEtablishment}
                        error={Boolean(errors?.etablishment)}
                      >
                        <MenuItem value={0}>Choose Your Etablishement</MenuItem>
                        {etablishments.map((etablishment) => {
                          return (
                            <MenuItem value={etablishment.id}>
                              {etablishment.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <FormHelperText error={Boolean(errors?.etablishment)}>
                        {errors?.etablishment}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Addresse Email"
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
                      label="Mot De Passe"
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
                          <Checkbox checked={checked} onClick={handleChecked} value="allowExtraEmails" color="primary" />
                        }
                        label="J'accepte les conditions d'utilisations"
                      />
                    {flag && <FormHelperText error>Veuillez accepter les conditions d'abord</FormHelperText>}
                  </Grid>

                  <Modal
                    size="lg"
                    show={show}
                    onHide={() => setShow(false)}
                    dialogClassName="modal-220w"
                    aria-labelledby="example-custom-modal-styling-title"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-custom-modal-styling-title">
                        <h3>les conditions d'utilisations</h3>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>
                        Vous êtes actuellement connecté(e) au Site Internet
                        (www.forum-uit.ma) de La 1ère Edition du Forum Virtuel à
                        L’Université Ibn Tofail. Tout accès et navigation sur le
                        site (www.forum-uit.ma) supposent l'acceptation de
                        l’utilisateur et son respect de l'ensemble de nos
                        Conditions Générales d’utilisation décrites ci-après :
                        <br />
                        <h5>1. ACCESSIBILITE :</h5>
                        L'accès au site (www.forum-uit.ma) est gratuit. Ce site
                        est accessible 24h sur 24h et 7 jours sur 7. Cependant,
                        l'équipe qui coordonne l'administration du site peut
                        être amenée à interrompre le site ou une partie des
                        services, notamment pour des opérations de maintenance.
                        <br />
                        <h5>2. LES DONNEES PERSONNELLES :</h5>
                        Le site (wwww.forum-uit.ma) collecte des informations
                        provenant des visiteurs du site internet au moyen de
                        formulaire figurant sur ledit site internet. Les
                        informations personnelles qui sont collectées, notamment
                        à travers les formulaires d’inscription, ou de création
                        de CV se limitent à celles qui sont nécessaires pour
                        générer un CV décrivant de manière détaillée le parcours
                        de l'étudiant(e) dans l'université IBN TOFAIL.
                        <br />
                        Par ailleurs, Vous disposez des droits suivants :
                        <ul>
                          <li>
                            - Demander la mise à jour de vos données, si
                            celles-ci sont inexactes.
                          </li>
                          <li>- Demander la suppression de vos données.</li>
                          <li>
                            - Demander la limitation du traitement de vos
                            données.
                          </li>
                          <li>
                            - Vous opposer ou retirer votre consentement à
                            l’utilisation, par nos services, de vos coordonnées.
                          </li>
                        </ul>
                        Il est important à préciser que nous mettons en place
                        tous les moyens adaptés à assurer la confidentialité et
                        la sécurité de vos données personnelles, de manière à
                        empêcher leur endommagement, effacement ou accès par des
                        tiers non autorisés. L’accès à vos données est
                        strictement limité aux responsables de la gestion du
                        site (WWW.forum-uit.ma). Cependant les données
                        collectées pourront éventuellement être communiquées à
                        des Manager d'entreprises chargés de recrutement ou
                        représentant des entreprises participant dans le forum.
                        Il est à préciser que dans le cadre de l’exécution de
                        leurs prestations, les représentants des entreprises
                        n’ont qu’un accès limité à vos données et ont une
                        obligation contractuelle de les utiliser en conformité
                        avec les dispositions de la législation applicable en
                        matière de protection des données personnelles.
                        <br />
                        <h5>3. MODIFICATION DES CONDITIONS D’UTILISATION :</h5>
                        L'équipe qui coordonne l'administration du site se
                        réserve la possibilité de modifier, à tout moment et
                        sans préavis, les Présentes Conditions d’utilisation
                        afin de les adapter aux évolutions du site et/ou de son
                        exploitation.
                      </p>
                    </Modal.Body>
                  </Modal>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  S'inscrire
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
                      Avez-vous deja un compte ? Se Connecter
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </>
          )}
          {!successful && value === 1 && (
            <>
              <Typography component="h1" variant="h5" className={classes.typo}>
                S'inscrire comme manager
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
                      label="Nom"
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
                      label="Prénom"
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
                      label="Nom De L'entreprise"
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
                      label="Pseudo"
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
                      label="Adresse Email"
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
                      label="Mot De Passe"
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
                          <Checkbox checked={checked} onClick={handleChecked} value="allowExtraEmails" color="primary" />
                        }
                        label="J'accepte les conditions d'utilisations"
                      />
                    {flag && <FormHelperText error>Veuillez accepter les conditions d'abord</FormHelperText>}
                  </Grid>

                  <Modal
                    show={show}
                    size="lg"
                    onHide={() => setShow(false)}
                    dialogClassName="modal-190w"
                    aria-labelledby="example-custom-modal-styling-title"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-custom-modal-styling-title">
                        <h3>les conditions d'utilisations</h3>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>
                        Vous êtes actuellement connecté(e) au Site Internet
                        (www.forum-uit.ma) de La 1ère Edition du Forum Virtuel à
                        L’Université Ibn Tofail. Tout accès et navigation sur le
                        site (www.forum-uit.ma) supposent l'acceptation de
                        l’utilisateur et son respect de l'ensemble de nos
                        Conditions Générales d’utilisation décrites ci-après :
                        <br />
                        <h5>1. ACCESSIBILITE :</h5>
                        L'accès au site (www.forum-uit.ma) est gratuit. Ce site
                        est accessible 24h sur 24h et 7 jours sur 7. Cependant,
                        l'équipe qui coordonne l'administration du site peut
                        être amenée à interrompre le site ou une partie des
                        services, notamment pour des opérations de maintenance.
                        <br />
                        <h5>2. LES DONNEES PERSONNELLES :</h5>
                        Le site (wwww.forum-uit.ma) collecte des informations
                        provenant des visiteurs du site internet au moyen de
                        formulaire figurant sur ledit site internet. Les
                        informations personnelles qui sont collectées, notamment
                        à travers les formulaires d’inscription, ou de création
                        de CV se limitent à celles qui sont nécessaires pour
                        générer un CV décrivant de manière détaillée le parcours
                        de l'étudiant(e) dans l'université IBN TOFAIL.
                        <br />
                        Par ailleurs, Vous disposez des droits suivants :
                        <ul>
                          <li>
                            - Demander la mise à jour de vos données, si
                            celles-ci sont inexactes.
                          </li>
                          <li>- Demander la suppression de vos données.</li>
                          <li>
                            - Demander la limitation du traitement de vos
                            données.
                          </li>
                          <li>
                            - Vous opposer ou retirer votre consentement à
                            l’utilisation, par nos services, de vos coordonnées.
                          </li>
                        </ul>
                        Il est important à préciser que nous mettons en place
                        tous les moyens adaptés à assurer la confidentialité et
                        la sécurité de vos données personnelles, de manière à
                        empêcher leur endommagement, effacement ou accès par des
                        tiers non autorisés. L’accès à vos données est
                        strictement limité aux responsables de la gestion du
                        site (WWW.forum-uit.ma). Cependant les données
                        collectées pourront éventuellement être communiquées à
                        des Manager d'entreprises chargés de recrutement ou
                        représentant des entreprises participant dans le forum.
                        Il est à préciser que dans le cadre de l’exécution de
                        leurs prestations, les représentants des entreprises
                        n’ont qu’un accès limité à vos données et ont une
                        obligation contractuelle de les utiliser en conformité
                        avec les dispositions de la législation applicable en
                        matière de protection des données personnelles.
                        <br />
                        <h5>3. MODIFICATION DES CONDITIONS D’UTILISATION :</h5>
                        L'équipe qui coordonne l'administration du site se
                        réserve la possibilité de modifier, à tout moment et
                        sans préavis, les Présentes Conditions d’utilisation
                        afin de les adapter aux évolutions du site et/ou de son
                        exploitation.
                      </p>
                    </Modal.Body>
                  </Modal>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  S'inscrire
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
                      Avez-vous deja un compte ? Se Connecter
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </>
          )}
        </div>
        {message && (
          <Alert
            className="mt-3 h2 mx-5"
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
