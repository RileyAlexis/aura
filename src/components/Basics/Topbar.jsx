import { Grid, Paper } from "@mui/material";
import AccountMenu from "../AccountMenu/AccountMenu";

function Topbar() {
  return (
    <Paper elevation={3}>
      <AccountMenu />
    </Paper>
  );
}

export default Topbar;
