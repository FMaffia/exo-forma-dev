import React from "react";
import { Box, styled, Typography } from "@mui/material";

const TypographyFooter = styled(Typography)(({ theme }) => ({
  color: "white",
  fontFamily: "Saira Stencil One",
  fontSize: "2rem",
  opacity: 0.5,
}));
const TypographyFooterPre = styled(Typography)(({ theme }) => ({
  color: "white",
  fontFamily: "Saira Stencil One",
  fontSize: "2rem",
  opacity: 0.7,
}));
const TitleFooter = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex" }}>
        <TypographyFooterPre>EXO</TypographyFooterPre>
        <TypographyFooter>FORMA</TypographyFooter>
      </Box>
      <Box>
        <Typography variant="body1" color={"white"}>
          Exolab - Progetto di formazione interna 2022
        </Typography>
      </Box>
    </Box>
  );
};

export default TitleFooter;
