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
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import PropTypes from 'prop-types';

const RegisterModal = (props) => {
  const [isModal, setIsModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);
  const { isAuth, error, register, clearErrors } = props;

  const toggle = () => {
    // Clear Errors
    clearErrors();
    setIsModal(!isModal);
  };

  const onChange = (e) => {
    if (e.target.name === 'name') setName(e.target.value);
    if (e.target.name === 'email') setEmail(e.target.value);
    if (e.target.name === 'password') setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Create User object
    const newUser = {
      name,
      email,
      password,
    };

    // console.log(newUser);

    register(newUser);
    // toggle();
  };

  useEffect(() => {
    // Check for register error
    if (error.id === 'REGISTER_FAIL') {
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
        Register
      </NavLink>

      <Modal isOpen={isModal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {msg ? <Alert color='danger'>{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input
                type='text'
                name='name'
                id='name'
                placeholder='Name'
                onChange={onChange}
              ></Input>
            </FormGroup>
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
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

RegisterModal.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  error: state.error,
});

const mapDisptachToProps = {
  register,
  clearErrors,
};

export default connect(mapStateToProps, mapDisptachToProps)(RegisterModal);
