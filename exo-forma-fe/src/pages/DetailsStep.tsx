import React, { useEffect } from 'react'
import { useMatch } from '@tanstack/react-location'
import Typography from '@mui/material/Typography'
import { useGetDetailsQuery, useGetStepByNumberQuery } from '../api/projectsApi'
import { Divider, Paper, Slide } from '@mui/material'
import { CustomTitleAccordion } from '../layout/CustomMui'
import PaginationSteps from '../components/details/PaginationSteps'

const DetailsStep = () => {
    const {
        params: { numberStep }
    } = useMatch()
    const {
        params: { projectPath }
    } = useMatch()
    const [checked, setChecked] = React.useState(true)
    const handleChange = () => {
        setChecked(false)
    }
    const { data: currentProject } = useGetDetailsQuery(projectPath)
    const { data: step } = useGetStepByNumberQuery({ idProject: currentProject?.id, number: +numberStep })
    /*  const snippetIndexStart: number = step ? step.desc.indexOf('<code>') : 0
const snippetIndexEnd: number = step ? step.desc.indexOf('</code>') : 0
const codeSnippet: string = step ? step.desc.substring(snippetIndexStart + 6, snippetIndexEnd) : ''
const test =
'export const GAME_DIFFICULTIES = {' +
'EASY: {' +
"label: 'Facile'," +
'cols: 9,' +
'rows: 9,' +
'mines: 10,' +
'},' +
'INTERMEDIATE: {' +
"label: 'Medio'," +
'cols: 16,' +
'rows: 16,' +
'mines: 40,' +
'},' +
'HARD: {' +
"label: 'Difficile'," +
'cols: 30,' +
'rows: 16,' +
'mines: 99,' +
'},' +
'};'*/
    useEffect(() => {
        setChecked(true)
    }, [numberStep])
    return (
        <>
            <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
                <Paper sx={{ width: '100%', minHeight: '50vh', mt: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                    <CustomTitleAccordion>Step {`${numberStep}/${currentProject?.stepsCount}`}</CustomTitleAccordion>
                    <Typography variant="h3" gutterBottom component="div">
                        {step && step.title}
                    </Typography>
                    {/*
            <CopyBlock showLineNumbers text={test} startingLineNumber={1} language={'javascript'} wrapLines={true} theme={dracula} />
*/}
                    {step && (
                        <Typography sx={{ flexGrow: 2, display: 'flex', alignItems: 'center' }}>
                            {currentProject && <span className="content" dangerouslySetInnerHTML={{ __html: step.desc }} />}
                        </Typography>
                    )}
                    <div>
                        <Divider sx={{ mb: 2 }} />
                        <PaginationSteps handleChange={handleChange} />
                    </div>
                </Paper>
            </Slide>
        </>
    )
}

export default DetailsStep
