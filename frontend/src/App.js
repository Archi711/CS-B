import React from 'react'
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react'
import { RecoilRoot } from 'recoil'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import GuardedRoute from './common/GuardedRoute'
import Login from './pages/Login'
import Cases from './pages/Cases'
import NotFound from './pages/NotFound'
import ErrorBoundaryC from './common/ErrorBoundaryC';
import AddCase from './components/AddCase';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <Box>
          <Grid minH="100vh" p={3} templateRows="1fr 11fr">
            <ErrorBoundaryC>
              <Router>
                <Header></Header>
                <Switch>
                  <GuardedRoute
                    path="/"
                    exact
                    Component={Dashboard}
                    ComponentElse={Login}
                  />
                  <GuardedRoute
                    path="/cases/add"
                    exact
                    Component={AddCase}
                    ComponentElse={Login}
                  />
                  <GuardedRoute
                    path="/cases"
                    exact
                    Component={Cases}
                    ComponentElse={Login}
                  />

                  <Route component={NotFound} />
                </Switch>
              </Router>
            </ErrorBoundaryC>
          </Grid>
        </Box>
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default App
