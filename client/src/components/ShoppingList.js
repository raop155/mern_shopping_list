import React, { useEffect, useState } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

const ShoppingList = (props) => {
  // const [items, setItems] = useState(props.items.items);
  const items = props.items;

  useEffect(() => {
    // props.getItems();
  }, []);

  const onDelete = (id) => {
    console.log('id', id);
    props.deleteItem(id);
  };

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className='shopping-list'>
          {items.map(({ id, name }) => (
            <CSSTransition key={id} timeout={250} classNames='fade'>
              <ListGroupItem>
                <Button
                  className='remove-btn'
                  color='danger'
                  size='sm'
                  onClick={() => onDelete(id)}
                >
                  &times;
                </Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    items: state.item.items,
  };
};

const mapDispatchToProps = {
  getItems,
  deleteItem: (id) => deleteItem(id),
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);
