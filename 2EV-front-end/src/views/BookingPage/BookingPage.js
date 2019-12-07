import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";
import logo from "assets/img/badge.png";
import Calendar from "components/Calendar/Calendar";
import Swal from 'sweetalert2';

// API address for the backend
const API_BASE = "http://localhost:8080";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

const paraStyle = {
  display: "inline"
};

const BookingPage = props => {
  const classes = useStyles();
  const { ...rest } = props;
  const [events, setEvents] = useState([]);
  const token = useSelector(state => state.user.token);
  const isAdmin = useSelector(state => state.user.isAdmin);

  useEffect(() => {
    const fetchEventsAdmin = async () => {
      const url = `${API_BASE}/booking/adminFetch`;
      const result = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      });
      const { appointments } = await result.json();
      const newEvents = appointments.map(
        ({ title, end, start, number, name }) => ({
          title,
          end,
          start,
          number,
          name
        })
      );
      setEvents(newEvents);

    };

    fetchEventsAdmin();
  }, []);

  // event for creating appointments
  const postEvent = async event => {
    console.log("EVENT => ", event);
    const url = `${API_BASE}/booking/create`;
    try {
      const result = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ ...event }),
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      });
      setEvents([...events, event]);
      Swal.fire(
        'Success!',
        'Thank you for making an appointment with us!',
        'success'
      )
    } catch (e) {
      console.log(e);
    }
  };



  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        logo={logo}
        brand="Photos by Kevin"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax filter image={require("assets/img/bg9.jpg")}>
        <div className={classes.container}>
          <GridContainer name="titleText" /*style={titleStyle}*/>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Book your appointment online.</h1>
              <br></br>
              <h4 style={paraStyle}>
                See what{"'"}s available and request your appointent now.
              </h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
              <div style={{ margin: 16 }}>
                <Calendar events={events} onChange={e => postEvent(e)} />
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;
