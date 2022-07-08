import React from 'react';
import {FormProps} from "../../model/models";
import {TextField} from "@mui/material";


const FormProgetto = ({currentProject, setField}: FormProps) => {
    return (
        <div>
            <TextField focused id="outlined-basic" label="Outlined" variant="outlined" value={currentProject.title} onChange={(e) => setField("title", e.target.value)}/>
        </div>
    );
};

export default FormProgetto;