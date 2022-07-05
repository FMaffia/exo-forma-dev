import React from "react";
import { Rating, styled } from "@mui/material";

export const Div = styled("div")(({ theme }) => ({
  ...theme.typography.subtitle1,
  marginBottom: theme.spacing(2),
  maxWidth: "900px",
  textAlign: "justify",
}));
export const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#9c4dcc",
  },
});
export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
