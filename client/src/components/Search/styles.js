import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  input: {
    width: "220px",
    backgroundColor: "white",
  },
  button: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));
