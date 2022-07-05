import * as React from "react";
import Typography from "@mui/material/Typography";
import useMyStyle from "../utility/useMyStyle";
import { Box } from "@mui/material";

function Copyright() {
  return (
    <>
      <Typography variant="body2" color="white">
        EXOLAB ~ Progetto di formazione interna {new Date().getFullYear()}
      </Typography>
    </>
  );
}

export default function StickyFooter() {
  const { footer }: any = useMyStyle();

  return (
    <Box component="div" className={footer}>
      <Typography variant="h3" noWrap color="secondary" component="span">
        EXO
      </Typography>
      <Typography variant="h3" noWrap color="white" component="span">
        FORMA
      </Typography>
      <Copyright />
    </Box>
  );
}
