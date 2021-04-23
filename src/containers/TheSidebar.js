import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Container} from '@material-ui/core';
import Badge from "@material-ui/core/Badge";
import Avatar from '@material-ui/core/Avatar';
import user from '../img/sotelo.jpeg';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react';

import CIcon from '@coreui/icons-react';

// sidebar nav config
import navigation from './_nav';

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""'
    }
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1
    },
    "100%": {
      transform: "scale(3.4)",
      opacity: 0
    }
  }
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  }
}));

const TheSidebar = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)

  return (
    <CSidebar
      className="bg-gradient-info"
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/dashboard">
        <p className="c-sidebar-brand-full">Sistema de Apoyo Estudiantil</p>
        
        
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}/>  
        
      </CSidebarBrand>
      <Container style={{padding:'30px'}}>
        {/* <Avatar style={{marginLeft:'60px'}} alt="Remy Sharp" src={user} className={classes.large} /> */}
        <StyledBadge
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        variant="dot"
      >
        <Avatar style={{marginLeft:'60px'}} alt="Sotelo" src={user} className={classes.large} />
      </StyledBadge>
        </Container>
      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
