// Main module.

// React, Redux and Sagas.
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

// Material-UI styling.
import { blue, grey, yellow, brown, red } from '@material-ui/core/colors';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';

// Top5 Music.
import * as appbar from './appbar';
import HomePage from './homepage';
import VotePage from './votepage';


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
                        <VotePage />
                    </>
                )
            }} />
        </MuiThemeProvider>
    </BrowserRouter>
));


const main = (rootComponentClass, appTheme) => {
    const store = createStore(
        combineReducers({
            appbar: appbar.appbarReducer,
        }),

        // TODO: Only show this in Development environment.
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

    const state = store.getState()

    return (
        <Provider store={ store }>
            <MuiThemeProvider theme={ appTheme }>
                { React.createElement(rootComponentClass, {theme: appTheme}) }
            </MuiThemeProvider>
        </Provider>
    )

}

render(main(App, theme), document.getElementById('react-app'))
