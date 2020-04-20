import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";
import styles from "./Cards.module.css";

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  const cardInfo = {
    infected: {
      title: "INFECTED",
      secTitle: "Number of active cases of Covid-19",
      number: confirmed,
      style: styles.infected,
    },
    Recovered: {
      title: "RECOVERED",
      secTitle: "Number of recoveries from Covid-19",
      number: recovered,
      style: styles.recovered,
    },
    deaths: {
      title: "DEATHS",
      secTitle: "Number of deaths caused by Covid-19",
      number: deaths,
      style: styles.deaths,
    },
  };

  if (!confirmed) {
    return "Loading...";
  }
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify='center' color='#fff'>
        {Object.keys(cardInfo).map(function (key) {
          return (
            <Grid
              key={key}
              item
              component={Card}
              xs={12}
              md={3}
              className={cx(styles.card, cardInfo[key].style)}
            >
              <CardContent>
                <Typography gutterBottom>{cardInfo[key].title}</Typography>
                <Typography varaint='h5' className={styles.number}>
                  <CountUp
                    start={0}
                    end={cardInfo[key].number.value}
                    duration={2.5}
                    separator=','
                  />
                </Typography>
                <Typography>{new Date(lastUpdate).toDateString()}</Typography>
              </CardContent>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Cards;
