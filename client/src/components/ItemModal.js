import React, { useState } from 'react';
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
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import Proptypes from 'prop-types';

const ItemModal = (props) => {
  const [isModal, setIsModal] = useState(false);
  const [name, setName] = useState('');
  const { isAuth } = props;

  const toggle = () => {
    setIsModal(!isModal);
  };

  const onChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name,
    };

    console.log('newItem', newItem);
    props.addItem(newItem);

    toggle();
  };

  return (
    <Container>
      {isAuth ? (
        <Button color='dark' style={{ marginBottom: '2em' }} onClick={toggle}>
          Add Item
        </Button>
      ) : (
        <h4 className='mb-3 '>Please log in to manage items</h4>
      )}

      <Modal isOpen={isModal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add to Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for='item'>New Item:</Label>
              <Input
                type='text'
                name='name'
                id='item'
                placeholder='Add shopping item'
                onChange={onChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Button color='dark' style={{ marginTop: '2em' }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

ItemModal.propTypes = {
  isAuth: Proptypes.bool.isRequired,
  addItem: Proptypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

const mapDisptachToProps = {
  addItem,
};

export default connect(mapStateToProps, mapDisptachToProps)(ItemModal);
