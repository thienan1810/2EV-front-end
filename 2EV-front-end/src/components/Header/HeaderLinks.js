/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import {
  AccountCircle,
  Event,
  Face
} from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

//Grab the stored data from the database
import { useDispatch, useSelector } from "react-redux";
import { USER_SIGN_OUT } from "actions/actionTypes";

// import recompose
import { compose } from "recompose";

// import router HOC
import { withRouter } from "react-router";

import Swal from "sweetalert2";

const useStyles = makeStyles(styles);

const HeaderLinks = props => {
  const classes = useStyles();
  const token = useSelector(state => state.user.token);
  const name = useSelector(state => state.user.name);
  const dispatch = useDispatch();

  const pushTo = (route = "/") => () => {
    // Object Destructing. Same as const push = props.history.push but shorter and nicer.
    const {
      history: { push }
    } = props;
    push(route);
  };

  const matchesRoute = route => {
    const {
      history: {
        location: { pathname }
      }
    } = props;
    return route === pathname;
  };

  const logout = async () => {
    try {
      dispatch({
        type: USER_SIGN_OUT,
        payload: {}
      });
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: e
      });
    }
  };

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          onClick={pushTo("/profile")}
          className={
            matchesRoute("/profile") ? classes.navLinkHover : classes.navLink
          }
        >
          <Face className={classes.icons} /> About
        </Button>
      </ListItem>
      {token
        ? [
            <ListItem className={classes.listItem}>
              <Button
                color="transparent"
                onClick={pushTo("/booking")}
                className={
                  matchesRoute("/booking")
                    ? classes.navLinkHover
                    : classes.navLink
                }
              >
                <Event className={classes.icons} /> Booking
              </Button>
            </ListItem>
          ]
        : []}
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText={name ? name : "Account"}
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={AccountCircle}
          dropdownList={
            token
              ? [
                  <Link
                    to="/"
                    onClick={logout}
                    className={classes.dropdownLink}
                  >
                    Log Out
                  </Link>,
                  <Link to="/dashboard" className={classes.dropdownLink}>
                    Dashboard
                  </Link>
                ]
              : [
                  <Link to="/register" className={classes.dropdownLink}>
                    Create Account
                  </Link>,
                  <Link to="/login" className={classes.dropdownLink}>
                    Log In
                  </Link>
                ]
          }
        />
      </ListItem>
    </List>
  );
};

export default compose(withRouter)(HeaderLinks);
