
// React.
import React from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'

// Material-UI components.
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'


export function ListItemLink(props) {
    const { icon, primary, to } = props

    const renderLink = React.useMemo(
      () => React.forwardRef((itemProps, ref) => <RouterLink to={ to } ref={ ref } { ...itemProps } />),[to],
    )

    return (
      <li>
        <ListItem button component={ renderLink }>
          {icon ? <ListItemIcon>{ icon }</ListItemIcon> : null}
          <ListItemText primary={ primary } />
        </ListItem>
      </li>
    )
}


ListItemLink.propTypes = {
    icon: PropTypes.element,
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
}


export function ButtonLink(props) {
    const { text, to } = props

    const renderLink = React.useMemo(
      () => React.forwardRef((itemProps, ref) => <RouterLink to={ to } ref={ ref } { ...itemProps } />),[to],
    )

    return (
        <Button variant={ props.variant } color={ props.color } component={ renderLink }>
          { text }
        </Button>
    )
}


ButtonLink.propTypes = {
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
}


export const fetchJson = function* (url, config = {}) {
    if (config.headers) {
        config.headers.Accept = 'application/json'

    } else {
        config.headers = {Accept: 'application/json'}
    }

  return yield fetch(url, config).then(resp => resp.json().then(json => {
        if (resp.ok && !json.error) {
            return json
        }
    }))
}
