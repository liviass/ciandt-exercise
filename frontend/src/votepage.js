// Formulário de votação do Top5.

// React.
import React from 'react';
import { Redirect } from 'react-router-dom';

// Redux and sagas.
import { combineReducers } from 'redux';
import { connect } from 'react-redux';
import { all, call, put, take } from 'redux-saga/effects';

// Material-UI components.
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

// Material-UI styling.
import { withStyles } from '@material-ui/core/styles';

// Top5 Radio.
import { fetchJson } from './utils';
import ListItemText from '@material-ui/core/ListItemText';

// Redux and Sagas.
const setNickname = value => (
    {type: 'votepage/SET_NICKNAME', value}
)

const setSong = (position, value) => (
    {type: 'votepage/SET_SONG', position, value}
)

const selectSong = (position, value) => (
    {type: 'votepage/SELECT_SONG', position, value}
)

const getSongs = () => (
    {type: 'votepage/GET_SONGS.BEGIN'}
)

const sendTop5 = data => (
    {type: 'votepage/SEND_TOP5', data}
)

const navHomepage = () => (
    {type: 'votepage/REDIRECT_TO_HOMEPAGE'}
)

const clearState = () => (
    {type: 'votepage/CLEAR_STATE'}
)


const state0 = {
    nickname: '',
    songsList: [], // lista de músicas para escolher.
    selectedSongs: { // Músicas selecionadas.
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
    },
    redirected: false
}


export const votepageReducer = combineReducers({
    songsList: (state = state0.songsList, action) => {
        if (action.type == 'votepage/GET_SONGS.END') {
            return action.songs

        } else if (action.type == 'votepage/CLEAR_STATE') {
            return state0.songsList

        } else {
            return state
        }
    },
    nickname: (state = state0.nickname, action) => {
        if (action.type == 'votepage/SET_NICKNAME') {
            return action.value

        } else if (action.type == 'votepage/CLEAR_STATE') {
            return state0.nickname

        } else {
            return state
        }
    },
    selectedSongs: (state = state0.selectedSongs, action) => {
        if (action.type == 'votepage/SELECT_SONG') {
            return {...state, [action.position]: action.value}

        } else if (action.type == 'votepage/CLEAR_STATE') {
            return state0.selectedSongs

        } else {
            return state
        }
    },
    redirected: (state = state0.redirected, action) => {
        if (action.type == 'votepage/REDIRECT_TO_HOMEPAGE') {
            return true

        } else if (action.type == 'votepage/CLEAR_STATE') {
            return state0.redirected

        } else {
            return state
        }
    },
})


const getSongsSaga = function* () {
    const getSongs = () => {
        return fetchJson(`${process.env.HOST}/songs/list`)
    }

    while (true) {
        // TODO: Treat possible errors returned from server request.
        yield take('votepage/GET_SONGS.BEGIN')

        const data = yield call(getSongs)

        yield put({ type: 'votepage/GET_SONGS.END', songs: data })
    }
}


const sendTop5Saga = function* () {
    const postTop5 = ({ nickname, songs }) => {
        const post = {method: 'post'}

        post.headers = {'Content-Type': 'application/json'}
        post.body = JSON.stringify({nickname, songs})

        return fetchJson(`${process.env.HOST}/votes/add`, post)
    }

    while (true) {
        // TODO: Treat possible errors returned from server request.
        const { data } = yield take('votepage/SEND_TOP5')

        yield call(postTop5, data)

        yield put(navHomepage())
    }
}

export const rootSaga = function* () {
    yield all([
        getSongsSaga(),
        sendTop5Saga()
    ])
}

// Style.
const sheet = theme => ({
    page: {
        minHeight: 'calc(100vh - 64px)',  // It's the viewport minus the AppBar height.
        position: 'relative'
    },
    title: {
        margin: theme.spacing(2)
    },
    form: {
        margin: theme.spacing(4),
        '& .nickname': {
            marginBottom: theme.spacing(3)
        },
        '& .subtitle': {
            marginBottom: theme.spacing(1)
        },
        '& .input-song': {
            marginBottom: theme.spacing(3)
        }
    },
    'send-button': {
        float: 'right'
    }

})


export class VotePage extends React.Component {
    componentDidMount() {
        this.props.handleMount()
    }

    componentWillUnmount() {
        this.props.handleUnmount()
    }

    render () {
        const { classes, redirected, ...props } = this.props

        // If the user already voted, redirect it to the homepage.
        if (redirected) {
            return <Redirect to="/" />
        }

        return (
            <div className={ classes.page }>
                <Typography variant="h3" className={ classes.title }>Sua playlist na nossa programação!</Typography>

                <div className={ classes.form }>
                    <TextField id="user-nickname" label="Nickname" placeholder="Digite seu nickname" variant="outlined" className="nickname" value={ props.nickname } onChange={ e => props.setNickname(e.target.value) } />

                    <Typography variant="subtitle1" className="subtitle">Escolha seu top5</Typography>

                    { [1, 2, 3, 4, 5].map( index => (
                        <Autocomplete key={ index } id={`song${index}`} className="input-song"
                            autoComplete
                            autoSelect
                            clearText="Limpar"
                            getOptionLabel={ option => `${option.name} - ${option.artists}`}
                            getOptionSelected={ (option, value) => { option._id === value._id }}
                            getOptionDisabled={ option => props.isOptionDisabled(option, props.selectedSongs) }
                            noOptionsText="Nenhuma música encontrada."
                            options={ props.songsList }
                            renderOption={ option => (
                                <ListItemText primary={ option.name } secondary={ option.artists } />
                            )}
                            renderInput={params => (
                                <TextField { ...params } placeholder="Digite o nome da música" variant="outlined" fullWidth onChange={ e => props.setSong(index, e.target.value) } InputProps={{...params.InputProps,
                                    startAdornment: <InputAdornment position="start">{`${index}.`}</InputAdornment>,
                                }}/>
                            )}
                            onChange={ (e, value) => props.selectSong(index, value)}
                        />
                    )) }

                    <Button variant="contained" color="secondary" className={ classes['send-button'] } onClick={ () => props.sendTop5(props.nickname, props.selectedSongs) }>Enviar</Button>
                </div>
            </div>
        )
    }
}

VotePage = connect(
    state => state.votepage,

    dispatch => ({
        handleMount() {
            dispatch(getSongs())
        },
        handleUnmount() {
            dispatch(clearState())
        },
        setNickname(value) {
            dispatch(setNickname(value))
        },
        isOptionDisabled(option, selected) {
            let flag = false

            flag = flag || (selected[1] !== null && selected[1]._id == option._id)
            flag = flag || (selected[2] !== null && selected[2]._id == option._id)
            flag = flag || (selected[3] !== null && selected[3]._id == option._id)
            flag = flag || (selected[4] !== null && selected[4]._id == option._id)
            flag = flag || (selected[5] !== null && selected[5]._id == option._id)

            return flag
        },
        setSong(position, value) {
            dispatch(setSong(position, value))
        },
        selectSong(position, value) {
            dispatch(selectSong(position, value))
        },
        sendTop5(nickname, songs) {
            const data = {nickname, songs: []}

            data.songs.push(songs[1]._id)
            data.songs.push(songs[2]._id)
            data.songs.push(songs[3]._id)
            data.songs.push(songs[4]._id)
            data.songs.push(songs[5]._id)

            dispatch(sendTop5(data))
        }
    })
)(withStyles(sheet, {withTheme: true})(VotePage))
