import React from "react";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
  },
  leftOverlay: {
    position: "fixed",
    maxHeight: "calc(100% - 64px)",
    overflow: "auto",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  popup: {
    width: "260px",
    backgroundColor: "white",
  },
}));
