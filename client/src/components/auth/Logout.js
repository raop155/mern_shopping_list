import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import { NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

const Logout = (props) => {
  return (
    <div>
      <NavLink href='#' onClick={props.logout}>
        Logout
      </NavLink>
    </div>
  );
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, {
  logout,
})(Logout);
