// Tela com resultado da votação.

// React.
import React from 'react';

// Material-Ui components.
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

// Material-UI list components.
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

// Material-UI styling.
import { withStyles } from '@material-ui/core/styles';


// Style.
const sheet = theme => ({
    page: {
        minHeight: 'calc(100vh - 64px)',  // It's the viewport minus the AppBar height.
        margin: theme.spacing(3),
        position: 'relative',
    },
    'music-list': {
        '& .music-name': {
            width: 100,
        },
        '& .votes': {
            textAlign: 'right'
        },
        '& .avatar': {
            width: theme.spacing(3),
            height: theme.spacing(3),
            fontSize: 12,
        },
    },
    'users-list': {
        '& .user': {
            width: 100,
        },
        '& .count': {
            textAlign: 'right'
        },
    }
})


// Components.
class ResultsPage extends React.Component {
    render () {
        const { classes, ...props } = this.props

        return (
            <div className={ classes.page }>
                <div className={ classes['music-list'] }>
                    <Typography variant="h2">Músicas mais votadas</Typography>
                    <Typography variant="subtitle1">12873489347 votos computados</Typography>

                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar className="avatar" variant="rounded">
                                    1º
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText className="music-name" primary="I need you (feat. Jane Handcock)" secondary="Flawless Real Talk" />
                            <ListItemText className="vote" secondary="12654 votos"/>
                        </ListItem>

                        <ListItem>
                            <ListItemAvatar>
                                <Avatar className="avatar" variant="rounded">
                                    2º
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText className="music-name"  primary="Don't" secondary="Bryson Tiller" />
                            <ListItemText className="vote" secondary="10254 votos"/>
                        </ListItem>

                        <ListItem>
                            <ListItemAvatar>
                                <Avatar className="avatar" variant="rounded">
                                    3º
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText className="music-name"  primary="10,000 Hours" secondary="Dan + Shay, Justin Bieber" />
                            <ListItemText className="vote" secondary="8325 votos"/>
                        </ListItem>

                        <ListItem>
                            <ListItemAvatar>
                                <Avatar className="avatar" variant="rounded">
                                    4º
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText className="music-name"  primary="Tusa" secondary="Karol G, Nicki Minaj" />
                            <ListItemText className="vote" secondary="7125 votos"/>
                        </ListItem>

                        <ListItem>
                            <ListItemAvatar>
                                <Avatar className="avatar" variant="rounded">
                                    5º
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText className="music-name"  primary="She's Like A Star" secondary="Taio Cruz" />
                            <ListItemText className="vote" secondary="5325 votos"/>
                        </ListItem>
                    </List>
                </div>

                <div className={ classes['users-list'] }>
                    <Typography variant="h4">Total de músicas no Ranking por ouvinte</Typography>

                    <List>
                        <ListItem>
                            <ListItemText className="user"  primary="udoug"/>
                            <ListItemText className="count" secondary="5 músicas"/>
                        </ListItem>
                        <ListItem>
                            <ListItemText className="user"  primary="clarinha"/>
                            <ListItemText className="count" secondary="4 músicas"/>
                        </ListItem>
                        <ListItem>
                            <ListItemText className="user"  primary="marta"/>
                            <ListItemText className="count" secondary="4 músicas"/>
                        </ListItem>
                        <ListItem>
                            <ListItemText className="user"  primary="humberto"/>
                            <ListItemText className="count" secondary="3 músicas"/>
                        </ListItem>
                        <ListItem>
                            <ListItemText className="user"  primary="xkcd"/>
                            <ListItemText className="count" secondary="2 músicas"/>
                        </ListItem>
                        <ListItem>
                            <ListItemText className="user"  primary="pedrinho"/>
                            <ListItemText className="count" secondary="1 música"/>
                        </ListItem>
                    </List>
                </div>
            </div>
        )
    }
}


ResultsPage = withStyles(sheet, {withTheme: true})(ResultsPage)


export default ResultsPage;
