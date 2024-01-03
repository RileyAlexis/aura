import { Grid, Paper } from "@mui/material";
import AccountMenu from "../AccountMenu/AccountMenu";

function Topbar() {
  return (
    <Paper elevation={2} sx={{ paddingRight: "8px" }}>
      <AccountMenu />
    </Paper>
  );
}

export default Topbar;
