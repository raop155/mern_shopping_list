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

const ItemModal = (props) => {
  const [isModal, setIsModal] = useState(false);
  const [name, setName] = useState('');

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
      <Button color='dark' style={{ marginBottom: '2em' }} onClick={toggle}>
        Add Item
      </Button>

      <Modal isOpen={isModal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add to Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for='item'>Item</Label>
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

const mapDisptachToProps = {
  addItem: (item) => addItem(item),
};

export default connect(null, mapDisptachToProps)(ItemModal);
