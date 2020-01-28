// Tela com resultado da votação.

// React.
import React from 'react';

// Redux and sagas.
import { combineReducers } from 'redux';
import { connect } from 'react-redux';
import { all, call, put, take } from 'redux-saga/effects';

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

// Top5 Radio.
import { fetchJson } from './utils';


// Redux and Sagas.
const getResults = () => (
    {type: 'resultspage/GET_RESULTS.BEGIN'}
)
const clearState = () => (
    {type: 'resultspage/CLEAR_STATE'}
)

const state0 = {
    top5List: [],
    usersList: []
}

export const resultsPageReducer = combineReducers({
    top5List: (state = state0.top5List, action) => {
        if (action.type == 'resultspage/GET_RESULTS.END') {
            return action.top5

        } else if (action.type == 'resultspage/CLEAR_STATE') {
            return state0.top5List

        } else {
            return state
        }
    },
    usersList: (state = state0.usersList, action) => {
        if (action.type == 'resultspage/GET_RESULTS.END') {
            return action.users

        } else if (action.type == 'resultspage/CLEAR_STATE') {
            return state0.usersList

        } else {
            return state
        }
    }
})


const getResultsSaga = function* () {
    const getResults = () => {
        return fetchJson(`${process.env.HOST}/votes/top5`)
    }

    while (true) {
        yield take('resultspage/GET_RESULTS.BEGIN')

        const data = yield call(getResults)

        yield put({ type: 'resultspage/GET_RESULTS.END', ...data })
    }
}


export const rootSaga = function* () {
    yield all([
        getResultsSaga()
    ])
}


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
export class ResultsPage extends React.Component {
    componentDidMount() {
        this.props.handleMount()
    }

    componentWillUnmount() {
        this.props.handleUnmount()
    }

    render () {
        const { classes, ...props } = this.props

        return (
            <div className={ classes.page }>
                <div className={ classes['music-list'] }>
                    <Typography variant="h2">Músicas mais votadas</Typography>

                    <List>
                        { props.top5List.map(({ name, artists, votes }, index) => {

                            return (
                                <ListItem key={ index }>
                                    <ListItemAvatar>
                                        <Avatar className="avatar" variant="rounded">
                                            { index }º
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText className="music-name"  primary={ name } secondary={ artists } />
                                    <ListItemText className="vote" secondary={ votes <= 1 ? `${votes} voto` : `${votes} votos` } />
                                </ListItem>
                            )
                        }) }

                    </List>
                </div>

                <div className={ classes['users-list'] }>
                    <Typography variant="h4">Total de músicas no Ranking por ouvinte</Typography>

                    <List>
                        { props.usersList.map(({ nickname, songs }, index) => {
                            return (
                                <ListItem key={ index }>
                                    <ListItemText className="user"  primary={ nickname } />
                                    <ListItemText className="count" secondary={ songs <= 1 ? `${songs} música` : `${songs} músicas` }/>
                                </ListItem>
                            )
                        })}
                    </List>
                </div>
            </div>
        )
    }
}


ResultsPage = connect(
    state => state.resultspage,

    dispatch => ({
        handleMount() {
            dispatch(getResults())
        },
        handleUnmount() {
            dispatch(clearState())
        }
    })
)(withStyles(sheet, {withTheme: true})(ResultsPage))
