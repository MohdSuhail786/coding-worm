import React, { useState } from "react";
import * as Icons from "@material-ui/icons";

import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  InputGroupAddon,
  InputGroup,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
} from "reactstrap";

import MenuIcon from "../Icons/HeaderIcons/MenuIcon";
import SearchBarIcon from "../Icons/HeaderIcons/SearchBarIcon";
import SearchIcon from "../Icons/HeaderIcons/SearchIcon";

import ProfileIcon from "../../assets/navbarMenus/pfofileIcons/ProfileIcon";
import MessagesIcon from "../../assets/navbarMenus/pfofileIcons/MessagesIcon";
import TasksIcon from "../../assets/navbarMenus/pfofileIcons/TasksIcon";

import logoutIcon from "../../assets/navbarMenus/pfofileIcons/logoutOutlined.svg";
import basketIcon from "../../assets/navbarMenus/basketIcon.svg";
import calendarIcon from "../../assets/navbarMenus/calendarIcon.svg";
import envelopeIcon from "../../assets/navbarMenus/envelopeIcon.svg";
import mariaImage from "../../assets/navbarMenus/mariaImage.jpg";
import notificationImage from "../../assets/navbarMenus/notificationImage.jpg";
import userImg from "../../assets/user.svg";

import s from "./Header.module.scss";
import "animate.css";
import { getUserData, logout } from "../../../../utils";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar, openSidebar } from "../Sidebar/store/action";

const Header = (props) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const sidebar = useSelector(state => state.sidebar)
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const user = getUserData()
  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const toggleSidebar = () => {
    if (sidebar.state) {
      dispatch(closeSidebar())
    } else {
      // const paths = props.location.pathname.split('/');
      // paths.pop();
      // props.dispatch(openSidebar());
      dispatch(openSidebar())
    }
  }

  const doLogout = () => {
    logout()
  }

  return (
    <Navbar className={`${s.root} d-print-none`}>
      <div>
        <NavLink
          onClick={() => toggleSidebar()}
          className={`d-md-none mr-3 ${s.navItem}`}
          href="#"
        >
          <MenuIcon className={s.menuIcon} />
        </NavLink>
      </div>
      <Form className="d-none d-sm-block" inline>
        <FormGroup>
          <InputGroup className='input-group-no-border'>
            <Input id="search-input" placeholder="Search Dashboard" className='focus'/>
            <InputGroupAddon addonType="prepend">
              <span>
                <SearchBarIcon/>
              </span>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
      </Form>
      <Nav className="ml-auto">
        <NavItem className="d-sm-none mr-4">
          <NavLink
            className=""
            href="#"
          >
            <SearchIcon />
          </NavLink>
        </NavItem>
        <Dropdown nav isOpen={menuOpen} toggle={() => toggleMenu()} className="tutorial-dropdown mr-2 mr-sm-3">
          <DropdownToggle nav>
            <div className={s.navbarBlock}>
              <i className={'eva eva-bell-outline'}/>
              <div className={s.count}></div>
            </div>
          </DropdownToggle>
          <DropdownMenu right className="navbar-dropdown notifications-dropdown" style={{ width: "340px" }}>
            <DropdownItem><img src={basketIcon} alt="Basket Icon"/><span>12 new orders have arrived today</span></DropdownItem>
            <DropdownItem>
              <div>
                <div className="d-flex flex-row mb-1">
                  <img src={mariaImage} alt="Maria" className={s.mariaImage} />
                  <div className="d-flex flex-column">
                    <p className="body-3">Maria</p>
                    <p className="label muted">15 min ago</p>
                  </div>
                </div>
                <img src={notificationImage} alt="Notification Icon" className={s.notificationImage}/>
                <p className="body-2 muted">It is just a simple image that can define th..</p>
              </div>
            </DropdownItem>
            <DropdownItem><img src={calendarIcon} alt="Calendar Icon"/><span>1 event has been canceled and ...</span></DropdownItem>
            <DropdownItem><img src={envelopeIcon} alt="Envelope Icon"/><span>you have 2 new messages</span></DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown isOpen={notificationsOpen} toggle={() => toggleNotifications()} nav id="basic-nav-dropdown" className="ml-3">
          <DropdownToggle nav caret className="navbar-dropdown-toggle">
            <span className={`${s.avatar} rounded-circle float-left mr-2`}>
            <Icons.Person />
            </span>
            <span className="small d-none d-sm-block ml-1 mr-2 body-1">{user.name}</span>
          </DropdownToggle>
          <DropdownMenu className="navbar-dropdown profile-dropdown" style={{ width: "194px" }}>
          <DropdownItem className={s.dropdownProfileItem} onClick={() => history.push('/dashboard/profile')}><ProfileIcon/><span>Profile</span></DropdownItem>
            {/* <DropdownItem className={s.dropdownProfileItem}><TasksIcon/><span>Tasks</span></DropdownItem>
            <DropdownItem className={s.dropdownProfileItem}><MessagesIcon/><span>Messages</span></DropdownItem> */}
            <NavItem>
              <NavLink onClick={() => doLogout()} href="#">
                <button className="btn btn-primary rounded-pill mx-auto mt-3 logout-btn" type="submit"><img src={logoutIcon} alt="Logout"/><span className="ml-1" style={{color:'white'}}>Logout</span></button>
              </NavLink>
            </NavItem>
          </DropdownMenu>
        </Dropdown>
      </Nav>
    </Navbar>
  )
}

export default Header;

