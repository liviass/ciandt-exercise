// Main module.

// React.
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

// Material-UI styling.
import { blue, grey, yellow, brown, red } from '@material-ui/core/colors';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';

// Top5 Music.
import HomePage from './homepage'


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
    <MuiThemeProvider theme={ theme }>
        <Route path='/' exact component={ HomePage } />
    </MuiThemeProvider>
));


render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('react-app'));
