import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './pages/Login';
import Header from './components/Header'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <Box>
          <Grid minH="100vh" p={3} templateRows='1fr 11fr'>
            <Header></Header>
            <Router>
              <Switch>
                <Route path='/login' render={Login}></Route>
              </Switch>
            </Router>
          </Grid>
        </Box>
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default App;
