import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FilterIcon from "@material-ui/icons/Filter";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Services</h2>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Family"
              description= "We know that family is important, my goal is to capture your family's special bond in the form of photographs."
              icon={FilterIcon}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Events"
              description= "Whether it's your wedding day or your graduation day, I assure to capture the perfect moment that you've been waiting for."
              icon={FavoriteIcon}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Fashion"
              description= "Let's make everyone's jaw drops <3."
              icon={SentimentVerySatisfiedIcon}
              iconColor="success"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
