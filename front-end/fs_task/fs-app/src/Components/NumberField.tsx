import React from 'react';
import TextField from '@mui/material/TextField';

function NumberField({ changeEvent }: { changeEvent: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
            <TextField
                id="outlined-number"
                label="Number"
                type="number"
                slotProps={{
                    inputLabel: {
                    shrink: true,
                    },
                }}
                sx={{width: '25%'}}
                onChange={changeEvent}
            />
    );
}

export default NumberField;