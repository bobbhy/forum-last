import React,{useRef} from 'react';
import {
  Nav,
  NavLink,
  NavLink2,
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
const Navbar = () => {
  const ref = useRef(null);
  const handleClick=()=>{
        if(ref.current.style.opacity==1)
        {
             ref.current.style.opacity=0
        }
        else
        {
            ref.current.style.opacity=1

        }
        
        console.log(ref.current.style.opacity)
  }
  return (
    <div className="d-flex flex-wrap">
      <Nav>
        <NavLink to='/'>
          <img src={logo} className="logo" alt='logo' />
        </NavLink>
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
            Team
          </NavLink>
          <NavLink href={`${window.location.pathname}#contact-us`} activeStyle>
            Contactez nous
          </NavLink>
          <NavLink2 to='/register' activeStyle>
            S'inscrire
          </NavLink2>
          
          
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/login'>Se connecter</NavBtnLink>
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
        Team
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