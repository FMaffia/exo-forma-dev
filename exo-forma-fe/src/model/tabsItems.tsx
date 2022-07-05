import { Project, TabDetail } from "./models";
import React from "react";
import ArchitectureOutlinedIcon from "@mui/icons-material/ArchitectureOutlined";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import PreviewIcon from "@mui/icons-material/Preview";
import StepperDetail from "../components/misc/StepperDetail";

export const tabsDetails = (currentProject: Project): TabDetail[] => {
  return [
    {
      title: "Descrizione",
      index: 0,
      label: "Descrizione",
      icon: <PlaylistAddCheckOutlinedIcon fontSize="large" />,
      body: (
        <span
          className="content"
          dangerouslySetInnerHTML={{ __html: currentProject.desc }}
        />
      ),
    },
    {
      title: "Anteprima steps",
      index: 1,
      label: "Anteprima steps",
      icon: <ArchitectureOutlinedIcon fontSize="large" />,
      body: <StepperDetail />,
    },
    {
      title: "Preview",
      index: 2,
      label: "Preview",
      icon: <PreviewIcon fontSize="large" />,
      body: <p>PREVIEW</p>,
    },
  ];
};
