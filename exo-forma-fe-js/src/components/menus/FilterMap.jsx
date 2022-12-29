import * as React from "react";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import DesignServicesIcon from "@mui/icons-material/DesignServices";

export const FilterMap = {
    TUTTI: {},
    COMPLETATI: {
        label: 'Completati',
        icon: <MilitaryTechIcon color={'primary'} fontSize="inherit"/>
    },
    IN_CORSO: {
        label: 'In corso',
        icon: <HourglassBottomIcon color={'primary'} fontSize="inherit"/>
    },
    BOZZA: {
        label: 'In bozza',
        icon: <DesignServicesIcon color={'primary'} fontSize="inherit"/>
    }
}