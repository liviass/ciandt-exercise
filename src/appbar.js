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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Material-UI icons.
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/Inbox';
import MailIcon from '@material-ui/icons/Mail';

// Material-UI styling.
import { withStyles } from '@material-ui/core/styles';

// Redux and Sagas
const openDrawer = () => (
    {type: 'appbar/OPEN_DRAWER'}
)

const closeDrawer = () => (
    {type: 'appbar/CLOSE_DRAWER'}
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
    }
})



// Style.
const sheet = theme => ({
    drawer: {
        padding: theme.spacing(1),
    }
})


// Components.
const sideList = props => (
    <div
      role="presentation"
      onClick={ props.closeDrawer }
      onKeyDown={ props.closeDrawer }
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
);


export class AppBar extends React.Component {
    componentWillUnmount() {
        this.props.handleUnmount()
    }

    render () {
        console.log(this.props)
        return (
            <>
                <AppBarMUI position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={ this.props.openDrawer} >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" style={ {flexGrow: 1} }>Top5 Music</Typography>
                    </Toolbar>
                </AppBarMUI>

                <SwipeableDrawer open={ this.props.drawerOpen } onClose={ this.props.closeDrawer } onOpen={ this.props.openDrawer }>
                    <div className={ this.props.classes.drawer } role="presentation" onClick={ this.props.closeDrawer } onKeyDown={ this.props.closeDrawer }>
                        <Typography variant="h6">Top5 Radio</Typography>

                        <List>
                            <ListItem button key="meutop5" >
                                <ListItemText primary={ "Meu Top 5" } />
                            </ListItem>
                        </List>

                        <Divider />
                        <Typography variant="subtitle1">Referências</Typography>

                        <List>
                            <ListItem button component="a" key="reactjs" href="https://reactjs.org/docs" target="_blank">
                                <ListItemText primary={ "React JS" } />
                            </ListItem>
                            <ListItem button component="a" key="materialui" href="https://material-ui.com" target="_blank">
                                <ListItemText primary={ "Material UI" } />
                            </ListItem>
                        </List>

                    </div>
                </SwipeableDrawer>
            </>
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
        }
    })
)(AppBar)

