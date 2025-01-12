import React, {useState} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add'
import SendIcon from '@mui/icons-material/Send'
import NumberField from './NumberField';
import {writeToDatabase} from '../Hooks/write-to-database';
import addMultipleNumbers from '../Hooks/add-multiple-numbers';
import DatabaseEntry from '../Types/DatabaseEntry';
import '@fontsource/roboto';

const formFont ={
    fontFamily: "roboto",
}

function InputForm() {
  const [addends, setAddends] = useState<Array<number>>([]);
  const [total, setTotal] = useState<number>();

  const [sent, setSent] = useState<boolean>(false);

  function displayTotal() {
    const totalResult: number = addMultipleNumbers(addends);
    setTotal(totalResult);
    setSent(false);
  }

  async function sendData() {
    if(typeof total !== 'undefined'){
        const dbEntry: DatabaseEntry = {addends, total}
        const success = writeToDatabase(dbEntry);

        setSent(await success);
    }

    setTotal(undefined);
  }

  const onNumberChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newArr = [...addends];
    newArr[id] = +event.target.value;
  
    setAddends(newArr);

    setTotal(undefined);
    setSent(false);
  }

  return (
    <Paper elevation={5} sx={{width: "auto", height: "auto", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2%'}}>
      <Stack spacing={4} direction="column" >
        <h1 style={formFont}>Input two numbers</h1>
        <Stack spacing={3} direction="row" >
          <NumberField changeEvent={(event) => onNumberChange(0, event)}/>
          <AddIcon />
          <NumberField changeEvent={(event) => onNumberChange(1, event)}/>
          <Button variant="contained" color="warning" onClick={displayTotal} disabled={addends[0] === undefined || addends[1] === undefined} endIcon={<AddIcon />}>Add</Button>
        </Stack>
        {total !== undefined  &&
            <Stack spacing={3} direction="row" >
                <h1 style={formFont}>{`=${total}`}</h1>
                <Button variant="contained" color="info" onClick={sendData} endIcon={<SendIcon />}>Send</Button>
            </Stack>
        }
        {sent && <h1 style={formFont}>Values Sent!</h1>}
      </Stack>
    </Paper >
  );
}

export default InputForm;
