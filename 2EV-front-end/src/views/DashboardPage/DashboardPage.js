import React, { useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import { LocationCity, Devices } from "@material-ui/icons/";
import { Typography } from "@material-ui/core";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import { useSelector } from "react-redux";
import ServiceList from "./ServiceList";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

import logo from "assets/img/badge.png";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function DashboardPage(props) {
  const classes = useStyles();
  const name = useSelector(state => state.user.name);
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  const [hasEvents, setHasEvents] = useState(false);

  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        logo={logo}
        brand="Photo By Kevin"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/black.png")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div style={{ height: 500, position: "relative" }}>
                  <Typography
                    variant="h4"
                    align="center"
                    style={{ margin: 24 }}
                  >
                    Welcome, <b>{name}</b>
                  </Typography>
                  <Typography variant="h6" align="center">
                    {hasEvents ? "Upcoming Appointments" : "No Appointments"}
                  </Typography>
                  <ServiceList setHasEvents={setHasEvents} />
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
