import React from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { capitalize } from "lodash";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import { Project } from "../../model/models";

export interface HeaderProps {
  currentProject: Project;
}
const HeaderDetail = ({ currentProject }: HeaderProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h2" sx={{ mb: 1 }}>
        {capitalize(currentProject?.title)}
      </Typography>
      <Typography
        variant="subtitle1"
        component={"div"}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <AutoFixHighOutlinedIcon sx={{ mr: 2 }} color={"primary"} />
        {`Creato il ${currentProject?.creationDate} da ${currentProject?.authors}`}
      </Typography>
      <Stack direction={"row"} spacing={2} sx={{ alignItems: "center", py: 2 }}>
        {currentProject.categories.map((c) => (
          <Chip key={c} color="secondary" label={`#${c}`} size="medium" />
        ))}
      </Stack>
    </Box>
  );
};

export default HeaderDetail;
