import React from "react";
import {Box, LinearProgress, LinearProgressProps, Rating, styled, Typography} from "@mui/material";

export const Div = styled("div")(({theme}) => ({
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

export function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box sx={{width: '100%', mr: 1}}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{minWidth: 35}}>
                <Typography variant="body2" color="text.white">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}
