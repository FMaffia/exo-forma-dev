import React, {useEffect} from "react";
import {Box, Skeleton, Step, StepContent, Stepper, Typography,} from "@mui/material";
import {RootState, sagaAction} from "../../store/store";
import {SAGA_PROJECT} from "../../saga/projectsSaga";
import {useSelector} from "react-redux";
import {includes, range} from "lodash";
import {LOAD_STEPS} from "../../utility/Constant";
import {Project} from "../../model/models";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import SimpleDialog from "./AlertDialog";
import useMyStyle from "../../utility/useMyStyle";

const StepperDetail = () => {
    const [open, setOpen] = React.useState(false);
    const loaders: string[] = useSelector<RootState, string[]>(
        (state) => state.ui.loaders
    );
    const currentProject: Project = useSelector<RootState, Project>(
        (state) => state.selectedProjects
    );
    const lastStep: number = currentProject.lastStep;
    const [activeStep, setActiveStep] = React.useState(lastStep - 1);
    const steps = currentProject.steps || [];
    const {stepStyle, activeStyle, completedStyle, lastStepStyle} = useMyStyle();
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
            <Typography color="primary">
                <strong>{steps[activeStep]?.title}</strong>
            </Typography>
        );
    };

    return (
        <Box sx={{width: "100%", px: 3}}>
            <p>Seleziona lo step da cui vuoi riprendere a progettare</p>
            {includes(loaders, LOAD_STEPS)
                ? range(15).map((i) => <Skeleton key={i}/>)
                : steps &&
                steps.length > 0 && (
                    <Stepper
                        orientation="vertical"
                        activeStep={activeStep}
                        classes={{
                            root: stepStyle,
                        }}
                        connector={<div/>}
                    >
                        {steps.map((step) => (
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
                                    sx={{mt: 1}}
                                >
                                    <StepLabel
                                        StepIconProps={{
                                            classes: {
                                                root:
                                                    step.index + 1 === lastStep
                                                        ? lastStepStyle
                                                        : stepStyle,
                                                completed: completedStyle,
                                                // @ts-ignore
                                                active: activeStyle,
                                            },
                                        }}
                                    >
                                        {step.title}
                                    </StepLabel>
                                </Button>
                                <StepContent sx={{ml: 2, my: 2}}>
                                    <Button
                                        variant={"contained"}
                                        onClick={() => handleStart()}
                                        size="small"
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
                header={<HeaderDialog/>}
                body={<BodyDialog/>}
                open={open}
                handleClose={() => setOpen(false)}
            />
        </Box>
    );
};

export default StepperDetail;
