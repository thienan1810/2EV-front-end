import React, {useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

import logo from 'assets/img/bg8.jpg';

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

const paraStyle = {
  display: 'inline'
};

const titleStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center',
  containter: 'true'
}

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const [firstName, setfirstName] =useState("");
  const [lastName, setlastName] =useState("");
  const [email, setemail] =useState("");
  const [schedule, setschedule] =useState([]);
  const [confirmationModalOpen, setconfirmationModalOpen] =useState(false);
  const [appointmentDateSelected, setappointmentDateSelected] =useState(false);
  const [appointmentMeridiem, setappointmentMeridiem] =useState(0);
  const [validEmail, setvalidEmail] =useState(true);
  const [validPhone, setvalidPhone] =useState(true);
  const [finished, setfinished] =useState(false);
  const [smallScreen, setsmallScreen] =useState(window.innerWidth < 768);
  const [stepIndex, setstepIndex] =useState(0);  

  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        logo={logo}
        brand="PhotoByDana"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      {/* <Parallax filter image={require("assets/img/woman-hair-styling.jpg")}> */}
      {/* <Parallax filter image={require("assets/img/brunette-woman-in-salon-chair.jpg")}> */}
      <Parallax filter image={require("assets/img/bg8.jpg")}>
        <div className={classes.container}>
          <GridContainer name="titleText" /*style={titleStyle}*/>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Book your appointment online.</h1>
              <br></br>
              <h4 style={paraStyle}>
                See what{"'"}s available and request your appointment now.
              </h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
        </div>
      </div>
      <Footer />
    </div>
  );
}
