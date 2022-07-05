import React, { useEffect } from "react";
import {
  Box,
  Skeleton,
  Step,
  StepContent,
  Stepper,
  Typography,
} from "@mui/material";
import { RootState, sagaAction } from "../../store/store";
import { SAGA_PROJECT } from "../../saga/projectsSaga";
import { useSelector } from "react-redux";
import { includes, range } from "lodash";
import { LOAD_STEPS } from "../../utility/Constant";
import { Project } from "../../model/models";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import SimpleDialog from "./AlertDialog";
import useMyStyle from "../../utility/useMyStyle";

const StepperDetail = () => {
  const lastStep: number = 5;
  const [activeStep, setActiveStep] = React.useState(lastStep - 1);
  const [open, setOpen] = React.useState(false);
  const loaders: string[] = useSelector<RootState, string[]>(
    (state) => state.ui.loaders
  );
  const currentProject: Project = useSelector<RootState, Project>(
    (state) => state.selectedProjects
  );
  const steps = currentProject.steps || [];
  const { stepStyle, activeStyle, completedStyle } = useMyStyle();
  useEffect(() => {
    currentProject.id &&
      sagaAction(SAGA_PROJECT.LOAD_STEPS_BY_PROJECT, currentProject.id);
  }, []);

  const handleSelect = (stepIndex: number) => {
    setActiveStep(stepIndex);
  };

  const handleStart = () => {
    setOpen(true);
  };

  const BodyDialog = () => {
    return <Box>Sei sicuro di voler avviare lo step selezionato?</Box>;
  };
  const HeaderDialog = () => {
    return (
      <Typography color="primary" variant="h5">
        <strong>{steps[activeStep]?.title}</strong>
      </Typography>
    );
  };

  return (
    <Box sx={{ width: "100%", px: 3 }}>
      {includes(loaders, LOAD_STEPS)
        ? range(15).map((i) => <Skeleton key={i} />)
        : steps &&
          steps.length > 0 && (
            <Stepper
              orientation="vertical"
              activeStep={activeStep}
              classes={{
                root: stepStyle,
              }}
              connector={<div />}
            >
              {steps.map((step, index) => (
                <Step
                  completed={step.completed}
                  key={step.title}
                  classes={{
                    root: stepStyle,
                    completed: completedStyle,
                    // @ts-ignore
                    active: activeStyle,
                  }}
                >
                  <Button
                    disabled={step.index >= lastStep}
                    onClick={() => handleSelect(step.index)}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    <StepLabel
                      StepIconProps={{
                        classes: {
                          root:
                            step.index + 1 === lastStep
                              ? activeStyle
                              : stepStyle,
                          completed: completedStyle,
                          // @ts-ignore
                          active: activeStyle,
                        },
                      }}
                    >
                      {step.index + 1 === lastStep ? (
                        <Typography color="primary">{step.title}</Typography>
                      ) : (
                        step.title
                      )}
                    </StepLabel>
                  </Button>
                  {/*  {activeStep <= step.index && (*/}
                  <StepContent>
                    <Button
                      variant={"text"}
                      onClick={() => handleStart()}
                      size="large"
                    >
                      {step.index + 1 === lastStep ? "Riprendi" : "Ricomincia"}
                    </Button>
                  </StepContent>
                  {/*
                    )}
*/}
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
