import React from "react";
import { Box, Fade } from "@mui/material";
import useLoginStyle from "../styles/useLoginStyle";

const LoginContainer = () => {
  const { loginBody }: any = useLoginStyle();

  return (
    <Fade in={true} unmountOnExit>
      <Box className={loginBody}>FORM</Box>
    </Fade>
  );
};

export default LoginContainer;
