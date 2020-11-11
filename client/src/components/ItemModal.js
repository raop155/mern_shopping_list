import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';

const ItemModal = () => {
  const [isModal, setIsModal] = useState(false);
  const [name, setName] = useState('');

  const toggle = () => {
    setIsModal(!isModal);
  };

  const onSubmit = () => {};

  return (
    <div>
      <Button color='dark' style={{ marginBottom: '2em' }} onClick={toggle}>
        Add Item
      </Button>

      <Modal isOpen={isModal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add to Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label></Label>

              <Input></Input>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default connect()(ItemModal);
