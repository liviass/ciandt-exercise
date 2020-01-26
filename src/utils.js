
// Coisas uteis.

// React.
import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

// Material-Ui components.
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


export function ListItemLink(props) {
    const { icon, primary, to } = props;

    const renderLink = React.useMemo(
      () => React.forwardRef((itemProps, ref) => <RouterLink to={ to } ref={ ref } { ...itemProps } />),[to],
    );

    return (
      <li>
        <ListItem button component={ renderLink }>
          {icon ? <ListItemIcon>{ icon }</ListItemIcon> : null}
          <ListItemText primary={ primary } />
        </ListItem>
      </li>
    );
}

ListItemLink.propTypes = {
    icon: PropTypes.element,
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

export function ButtonLink(props) {
    const { text, to } = props;

    const renderLink = React.useMemo(
      () => React.forwardRef((itemProps, ref) => <RouterLink to={ to } ref={ ref } { ...itemProps } />),[to],
    );

    return (
        <Button variant="contained" color="secondary" component={ renderLink }>
          { text }
        </Button>
    );
}

ButtonLink.propTypes = {
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};