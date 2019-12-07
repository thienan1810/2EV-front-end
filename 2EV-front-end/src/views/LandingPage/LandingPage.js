import React from "react";
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

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";

import { useSelector } from "react-redux";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const token = useSelector(state => state.user.token);

  const pushTo = (route = "/") => () => {
    // Object Destructing. Same as const push = props.history.push but shorter and nicer.
    const {
      history: { push }
    } = props;
    push(route);
  };

  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Photos By Kevin"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax filter image={require("assets/img/landing-bg.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Your Story Starts Here.</h1>
              <h4>
                Just sit back and relax, it's my turn to do the hard work!
                I promise very moment and detail will be taken with good care.
                Check our my services offered below.
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                onClick={token ? pushTo("/booking") : pushTo("/register")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas DoubleArrow" />
                Book an Appointment
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
