import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './pages/Dashboard';
import GuardedRoute from './common/GuardedRoute';
import Login from './pages/Login';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <Box>
          <Grid minH="100vh" p={3} templateRows='1fr 11fr'>
            <Router>
              <Header></Header>
              <Switch>
                <GuardedRoute path='/' exact Component={Dashboard} ComponentElse={Login} />
              </Switch>
            </Router>
          </Grid>
        </Box>
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default App;
