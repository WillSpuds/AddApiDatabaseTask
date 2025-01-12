import React from 'react';
import InputForm from './Components/InputForm';
import Stack from '@mui/material/Stack';
import '@fontsource/roboto';

const appFont = {
  fontFamily: "roboto",
  color: "white"
}

function App() {
  return (
    <Stack spacing={4} direction="column">
      <h1 style={appFont}>Number Addition with API and Database Demo</h1>
      <h3 style={appFont}>-Input two numbers below<br />-Press 'Add'<br />-View the result<br />-Press 'Send' to add all values as an entry in the database</h3>
      <InputForm />
      <h3 style={appFont}>*make sure the backend api project is running beforehand</h3>
    </Stack>
  );
}

export default App;
