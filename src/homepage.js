// React.
import React from 'react';

// Material-UI components.
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

// Material-UI icons.
import MenuIcon from '@material-ui/icons/Menu';

class HomePage extends React.Component {
    render () {
        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" style={ {flexGrow: 1} }>Top5 Music</Typography>
                </Toolbar>
            </AppBar>
        )
    }
}


export default HomePage;
