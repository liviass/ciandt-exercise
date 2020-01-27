// Tela inicial.

// React.
import React from 'react';

// Material-Ui components.
import Typography from '@material-ui/core/Typography';

// Material-UI styling.
import { withStyles } from '@material-ui/core/styles';

// Top5 Radio.
import { ButtonLink } from './utils'

// Style.
const sheet = theme => ({
    page: {
        minHeight: 'calc(100vh - 64px)',  // It's the viewport minus the AppBar height.
        position: 'relative'
    },
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
      }
})

// Components.
class HomePage extends React.Component {
    render () {
        const { classes, ...props } = this.props

        return (
            <div className={ classes.page }>
                <div className={ classes.content }>
                    <Typography>Quer montar a playlist do horário nobre da nossa Top5 Radio?</Typography>

                    <Typography>Então vote nas suas músicas favoritas e acompanhe nossa programação para saber se elas estão entre as 5 mais pedidas.</Typography>

                    <ButtonLink variant="contained" color="secondary" to="/vote" text="Montar playlist"/>
                </div>
            </div>
        )
    }
}

HomePage = withStyles(sheet, {withTheme: true})(HomePage)

export default HomePage;
