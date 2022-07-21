import React from "react";
import { Box, Skeleton, Step, StepContent, Stepper, Typography } from "@mui/material";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { range } from "lodash";
import { Project } from "../../types/models";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import SimpleDialog from "./AlertDialog";
import { grey, purple } from "@mui/material/colors";
import { useGetStepsByIdQuery } from "../../api/projectsApi";


const style = {
  stepStyle: {
    color: `${grey["600"]}!important`
  },
  completedStyle: {
    color: `${purple["800"]}!important`
  },
  activeStyle: {
    color: `${purple["400"]}!important`
  },
  lastStepStyle: {
    color: `${purple["900"]}!important`
  }
};
const StepperDetail = () => {
  const [open, setOpen] = React.useState(false);
  const loaders: string[] = useSelector<RootState, string[]>((state) => state.ui.loaders);
  const currentProject: Project = useSelector<RootState, Project>((state) => state.selectedProjects);
  const lastStep: number = currentProject.lastStep;
  const [activeStep, setActiveStep] = React.useState(lastStep - 1);
  const { activeStyle } = style;
  const { data: steps, isLoading } = useGetStepsByIdQuery(currentProject.id);

  const handleSelect = (stepIndex: number) => {
    setActiveStep(stepIndex);
  };

  const handleStart = () => {
    setOpen(true);
  };

  const BodyDialog = () => {
    return <Box component={"span"}>Sei sicuro di voler avviare lo step selezionato?</Box>;
  };

  const HeaderDialog = () => {
    return (
      <Typography color="primary">
        <strong>{steps && steps[activeStep]?.title}</strong>
      </Typography>
    );
  };

  return (
    <Box sx={{ width: "100%", px: 3 }}>

      <p>Seleziona lo step da cui vuoi riprendere a progettare</p>
      {isLoading
        ? range(15).map((i) => <Skeleton key={i} />)
        : steps &&
        steps.length > 0 && (
          <Stepper
            orientation="vertical"
            activeStep={activeStep}
            connector={<div />}
          >
            {steps.map((step) => (
              <Step
                completed={step.completed}
                key={step.title}
              >
                <Button
                  disabled={step.index >= lastStep}
                  onClick={() => handleSelect(step.index)}
                  sx={{ mt: 1 }}
                >
                  <StepLabel
                    StepIconProps={{
                      classes: {
                        active: activeStyle.color
                      }
                    }}
                  >
                    {step.title}
                  </StepLabel>
                </Button>
                <StepContent sx={{ ml: 2, my: 2 }}>
                  <Button
                    variant={"contained"}
                    onClick={() => handleStart()}
                    size="small"
                  >
                    {step.index + 1 === lastStep ? "Riprendi" : "Ricomincia"}
                  </Button>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        )}
      <SimpleDialog
        header={<HeaderDialog />}
        body={<BodyDialog />}
        open={open}
        handleClose={() => setOpen(false)}
      />
    </Box>
  );
};

export default StepperDetail;
