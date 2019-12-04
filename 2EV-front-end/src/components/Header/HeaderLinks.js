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
import { Apps, CloudDownload, Contacts, AccountCircle } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

//Grab the stored data from the database
import { useDispatch, useSelector } from "react-redux";
import { USER_SIGN_OUT } from "actions/actionTypes";

import Swal from "sweetalert2";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();

  const name = useSelector(state => state.user.name);
  const dispatch = useDispatch();

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
        <CustomDropdown
          noLiPadding
          buttonText={name ? name : "Account"}
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={AccountCircle}
          dropdownList={
            name
              ? [
                  <Link to="/" onClick={logout} className={classes.dropdownLink}>
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

      <ListItem className={classes.listItem}>
        <Button
          href="/Profile"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <CloudDownload className={classes.icons} /> About
        </Button>
      </ListItem>
      
    </List>
  );
}
