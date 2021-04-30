import React from 'react';
import useStyles from '../src/styles/use-styles'
import theme from '../src/styles/global-styles'
import { ThemeProvider } from '@material-ui/styles';
import Form from '../src/components/form';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Form/>
  </ThemeProvider>
  );
}

export default App;
