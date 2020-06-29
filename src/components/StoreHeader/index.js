/* 
StoreHeader: Used to represent the header of a store

title: store name
subtitle1: first part of address (street name and num)
subtitle2: 2nd part of address (city, province, postal code)

Example: <StoreHeader
          title="Walmart"
          subtitle1="300 Borough Dr Unit 3635,"
          subtitle2="Scarborough, ON M1P 4P5"
        />
*/
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  title: {
    marginTop: "40px",
    textAlign: "center",
    fontSize: "72pt",
    color: "#4455BB"
  },
  subtitle: {
    textAlign: "center",
    fontSize: "24pt"
  }
});

export default function StoreHeader(props) {
  const classes = useStyles();
  return (
    <div>
      <div className = {classes.title}>{props.title}</div>
      <div className = {classes.subtitle}>{props.subtitle1}</div>
      <div className = {classes.subtitle}>{props.subtitle2}</div>
    </div>
  );
}