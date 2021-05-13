import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  position: fixed;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
  0 3px 6px rgba(0, 0, 0, 0.23);
  top:0;
  left:0;
  background: #3f51b5;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 999;
  width:100vw;
  /* Third Nav */
  /* justify-content: flex-start; */
  padding-left:150px;
`;
export const Offset=styled.div`
height:80px;
width:100vw
`

export const NavLink = styled.a`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #15cdfc;
  }
`;
export const NavLink3 = styled.a`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  cursor: pointer;
  position:fixed;
  top:15px;
  left:20px;
  float:left
  &.active {
    color: #15cdfc;
  }
`;
export const NavLink2=styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    color: #15cdfc;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 940px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;

  /* Second Nav */
  /* margin-right: 24px; */

  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */

  @media screen and (max-width: 940px) {
    display: none;
  }
`;


export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */

  @media screen and (max-width: 940px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  /* Second Nav */
  margin-left: 24px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }

`;
export const Collapse=styled.div`
  display:flex;
  opacity: 0;
  transition: opacity 0.6s linear;
  position:fixed;
  flex-direction:column;
  top:80px;
  background:#3f51b5;
  width:100%;
  z-index:1000;
`
export const CollapseItem=styled.a`


  height: 70px;
  font-size:20px;
  border-bottom:0.5px solid lightgray;
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  cursor: pointer;

  &.active {
    color: #15cdfc;
  }

`
export const CollapseItem2=styled(Link)`


  height: 70px;
  font-size:20px;
  border-bottom:0.5px solid lightgray;
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  cursor: pointer;

  &.active {
    color: #15cdfc;
  }
  
`