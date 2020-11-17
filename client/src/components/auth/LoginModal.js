import React, { useEffect, useState } from 'react';
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from 'reactstrap';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import PropTypes from 'prop-types';

const LoginModal = (props) => {
  const [isModal, setIsModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);
  const { isAuth, error, login, clearErrors } = props;

  const toggle = () => {
    // Clear Errors
    clearErrors();
    setIsModal(!isModal);
  };

  const onChange = (e) => {
    if (e.target.name === 'email') setEmail(e.target.value);
    if (e.target.name === 'password') setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Attempt to login
    const user = { email, password };
    login(user);
  };

  useEffect(() => {
    // Check for register error
    if (error.id === 'LOGIN_FAIL') {
      setMsg(error.msg.message);
    } else {
      setMsg(null);
    }
  }, [error]);

  useEffect(() => {
    if (isModal && isAuth) {
      toggle();
    }
  }, [isAuth]);

  return (
    <Container>
      <NavLink href='#' onClick={toggle}>
        Login
      </NavLink>

      <Modal isOpen={isModal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {msg ? <Alert color='danger'>{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for='email'>Email</Label>
              <Input
                type='email'
                name='email'
                id='email'
                placeholder='Email'
                onChange={onChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for='password'>Password</Label>
              <Input
                type='password'
                name='password'
                id='password'
                placeholder='Password'
                onChange={onChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Button color='dark' style={{ marginTop: '2em' }} block>
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

LoginModal.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  error: state.error,
});

const mapDisptachToProps = {
  login,
  clearErrors,
};

export default connect(mapStateToProps, mapDisptachToProps)(LoginModal);
