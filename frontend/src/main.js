// Main module.

// React, Redux and Sagas.
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';


// Material-UI styling.
import { blue, grey, yellow, brown, red } from '@material-ui/core/colors';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';

// Top5 Music.
import * as appbar from './appbar';
import * as votepage from './votepage';
import * as resultspage from './resultspage';

import HomePage from './homepage';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: blue[900],
            contrastText: grey[50]
        },

        secondary: {
            main: yellow[600],
            contrastText: brown[800]
        },

        error: {
            main: red[800]
        },

        text: {
            primary: grey[900],
            secondary: grey[800]
        }
    }
});


const styles = {
    '@global': {
        body: {
            margin: 0,
            minWidth: 320,
            backgroundColor: grey[50]
        }
    }
};


// Main Component.
const App = withStyles(styles)((props) => (
    <BrowserRouter>
        <MuiThemeProvider theme={ theme }>
            <Route path='/' exact render={() => {
                return(
                    <>
                        <appbar.AppBar theme={ props.theme } { ...props.state } />
                        <HomePage />
                    </>
                )
            }} />

            <Route path='/vote' render={ () => {
                return(
                    <>
                        <appbar.AppBar theme={ props.theme } { ...props.state } />
                        <votepage.VotePage />
                    </>
                )
            }} />
            <Route path='/results' render={ () => {
                return(
                    <>
                        <appbar.AppBar theme={ props.theme } { ...props.state } />
                        <resultspage.ResultsPage />
                    </>
                )
            }} />
        </MuiThemeProvider>
    </BrowserRouter>
));

const rootSaga = function* () {
    yield all([
        votepage.rootSaga(),
        resultspage.rootSaga()
    ])
}


const composeFun = () => {
    if (process.env.NODE_ENV != 'production') {
        if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
            const cfg = {name: 'Top5Radio'}

            return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(cfg)
        }
    }

    return compose
}


const main = (rootComponentClass, appTheme) => {
    const sagas = createSagaMiddleware()
    const store = createStore(
        combineReducers({
            appbar: appbar.appbarReducer,
            votepage: votepage.votepageReducer,
            resultspage: resultspage.resultsPageReducer
        }),

        composeFun()(applyMiddleware(sagas))
    )

    const state = store.getState()

    // Sagas must run as early as possible, or they might miss actions.
    sagas.run(rootSaga)

    return (
        <Provider store={ store }>
            <MuiThemeProvider theme={ appTheme }>
                { React.createElement(rootComponentClass, {theme: appTheme}) }
            </MuiThemeProvider>
        </Provider>
    )
}

render(main(App, theme), document.getElementById('react-app'))
