// React.
import React from 'react';
import { combineReducers } from 'redux';

// Redux and sagas.
import { connect } from 'react-redux';

// Material-UI components.
import AppBarMUI from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

// List
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

// Material-UI icons.
import MenuIcon from '@material-ui/icons/Menu';
import RadioIcon from '@material-ui/icons/Radio';

// Material-UI styling.
import { withStyles } from '@material-ui/core/styles';

// Top5 Radio.
import { ButtonLink } from './utils'


// Redux and Sagas
const openDrawer = () => (
    {type: 'appbar/OPEN_DRAWER'}
)

const closeDrawer = () => (
    {type: 'appbar/CLOSE_DRAWER'}
)

const showMessage= ()  => (
    {type: 'appbar/SHOW_MESSAGE'}
)

const hideMessage = ()  => (
    {type: 'appbar/HIDE_MESSAGE'}
)

const clearState = () => (
    {type: 'appbar/CLEAR_STATE'}
)


export const appbarReducer = combineReducers({
    drawerOpen: (state = false, action) => {
        if (action.type == 'appbar/OPEN_DRAWER') {
            return true

        } else if (action.type == 'appbar/CLOSE_DRAWER') {
            return false

        } else if (action.type == 'appbar/CLEAR_STATE') {
            return false

        } else {
            return state
        }
    },
    messageShown: (state = false, action) => {
        if (action.type == 'appbar/SHOW_MESSAGE') {
            return true

        } else if (action.type == 'votepage/REDIRECT_TO_HOMEPAGE') {
            return true

        } else if (action.type == 'appbar/HIDE_MESSAGE') {
            return false

        } else {
            return state
        }
    }
})


// Style.
const sheet = theme => ({
    appbar: {
        height: 64
    },
    drawer: {
        padding: theme.spacing(1),
        '& .title > svg': {
            verticalAlign: 'text-bottom',
            marginRight: theme.spacing(1)
        },
        '& .subtitle': {
            fontWeight: 'bold'
        }
    }
})


// Components.
export class AppBar extends React.Component {
    componentWillUnmount() {
        this.props.handleUnmount()
    }

    render () {
        const { classes, ...props } = this.props

        return (
            <React.Fragment>
                <AppBarMUI position="static" className={ classes.appbar }>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={ props.openDrawer } >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" style={ {flexGrow: 1} }>Top5 Radio</Typography>
                    </Toolbar>
                </AppBarMUI>

                <SwipeableDrawer open={ props.drawerOpen } onClose={ props.closeDrawer } onOpen={ props.openDrawer }>
                    <div className={ classes.drawer } role="presentation" onClick={ props.closeDrawer } onKeyDown={ props.closeDrawer }>
                        <Typography variant="h6" className="title"color="textSecondary"><RadioIcon />Top5 Radio</Typography>

                        <Divider />

                        <List>
                            <ButtonLink variant="contained" color="primary" to="/vote" text="Vote no Top 5"/>
                        </List>

                        <Typography variant="subtitle1" color="primary" className="subtitle">Referências</Typography>

                        <List>
                            <ListItem button component="a" key="reactjs" href="https://reactjs.org/docs" target="_blank">
                                React JS
                            </ListItem>
                            <ListItem button component="a" key="materialui" href="https://reacttraining.com/react-router/" target="_blank">
                                React Router
                            </ListItem>
                            <ListItem button component="a" key="materialui" href="https://redux.js.org/" target="_blank">
                                Redux
                            </ListItem>
                            <ListItem button component="a" key="materialui" href="https://material-ui.com" target="_blank">
                                Material UI
                            </ListItem>
                            <ListItem button component="a" key="materialui" href="https://webpack.js.org/" target="_blank">
                                Webpack
                            </ListItem>
                            <ListItem button component="a" key="materialui" href="https://nodejs.org" target="_blank">
                                Node.js
                            </ListItem>
                            <ListItem button component="a" key="materialui" href="https://expressjs.com" target="_blank">
                                Express
                            </ListItem>
                            <ListItem button component="a" key="materialui" href="https://expressjs.com/en/resources/middleware/cors.html" target="_blank">
                                Express Cors
                            </ListItem>
                            <ListItem button component="a" key="materialui" href="https://www.mongodb.com/cloud" target="_blank">
                                MongoDB
                            </ListItem>
                            <ListItem button component="a" key="materialui" href="https://mongoosejs.com/docs/" target="_blank">
                                Mongoose
                            </ListItem>
                            <ListItem button component="a" key="materialui" href="https://docs.docker.com/" target="_blank">
                                Docker
                            </ListItem>
                            <ListItem button component="a" key="materialui" href="https://docs.docker.com/compose/" target="_blank">
                                Docker Compose
                            </ListItem>
                        </List>
                    </div>
                </SwipeableDrawer>

                { props.messageShown &&
                    <Snackbar open={ props.messageShown } autoHideDuration={ 3000 } onClose={ () => props.displayMessage(false) }>
                        <Alert onClose={ () => props.displayMessage(false) } severity="success">
                            Enviado com sucesso!
                        </Alert>
                    </Snackbar>
                }
            </React.Fragment>
        )
    }
}


AppBar = withStyles(sheet, {withTheme: true})(AppBar)


AppBar = connect(
    state => state.appbar,

    (dispatch, ownProps) => ({
        handleUnmount() {
            dispatch(clearState())
        },

        openDrawer() {
            if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                return;
            }

            dispatch(openDrawer())
        },

        closeDrawer() {
            if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                return;
            }

            dispatch(closeDrawer())
        },
        displayMessage(value) {
            if (value) {
                dispatch(showMessage())

            } else {
                dispatch(hideMessage())
            }
        }
    })
)(AppBar)
