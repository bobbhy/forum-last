import React,{useRef} from 'react';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Link } from "react-router-dom";
import {
  Nav,
  NavLink,
  NavLink2,
  NavLink3,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  Collapse,
  CollapseItem,
  CollapseItem2,
  Offset
} from './NavbarElements';
import logo from "../../logo.png";
import Welcome from './Presentation Children/welcome';
import Footer from './Presentation Children/Footer';
import Team from './Presentation Children/Team';
import ContactUs from './Presentation Children/ContactUs';
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    borderRadius: 20,
    boxShadow:'none',
    marginLeft:25,
    backgroundColor:'cornflowerblue',
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
  },
}));
const Navbar = () => {
  const classes = useStyles();
  const ref = useRef(null);
  const handleClick=()=>{
        if(ref.current.style.opacity==1)
        {
             ref.current.style.opacity=0
             ref.current.style.zIndex=0
        }
        else
        {
            ref.current.style.opacity=1
            ref.current.style.zIndex=1000

        }
        
  }
  return (
    <div className="d-flex flex-wrap bg-white roboto" style={{fontFamily:"font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;"}}>
      <Nav>
        <NavLink3 to='/'>
          <img src={logo} className="logo" alt='logo' />
        </NavLink3>
        <Bars onClick={handleClick}/>
        <NavMenu>
          <NavLink href={`${window.location.pathname}#home`} activeStyle>
            Accueil
          </NavLink>
          <NavLink  href={`${window.location.pathname}#about1`}  activeStyle>
            Presentation
          </NavLink>
          <NavLink href={`${window.location.pathname}#our-values`} activeStyle>
            Espaces
          </NavLink>
          <NavLink href={`${window.location.pathname}#clients`} activeStyle>
            Partenaires
          </NavLink>
          <NavLink href={`${window.location.pathname}#team`} activeStyle>
            Equipe
          </NavLink>
          <NavLink href={`${window.location.pathname}#contact-us`} activeStyle>
            Contactez nous
          </NavLink>
           
          
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
         <Link to="/login">
          <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<PersonIcon />}
      >
        Mon espace
      </Button>
      </Link>
      </NavBtn>
      </Nav>
      <Collapse ref={ref}>
       <CollapseItem href={`${window.location.pathname}#home`}>
        Accueil
       </CollapseItem>
       <CollapseItem href={`${window.location.pathname}#about1`}>
       Presentation
       </CollapseItem>
       <CollapseItem href={`${window.location.pathname}#our-values`}>
       Espaces
       </CollapseItem>
       <CollapseItem href={`${window.location.pathname}#clients`} >
       Partenaires
       </CollapseItem>
        <CollapseItem href={`${window.location.pathname}#team`}>
        Equipe
       </CollapseItem>
        <CollapseItem href={`${window.location.pathname}#contact-us`} >
        Contactez-nous
       </CollapseItem>
       <CollapseItem2 to='/register'>
        S'inscrire
       </CollapseItem2>
       <CollapseItem2 to='/login'>
        Se connecter
       </CollapseItem2>

      </Collapse>
      <Welcome className="test"/>
      <Team/>
      <ContactUs/>
      <Footer/>
    </div>
  );
};

export default Navbar;