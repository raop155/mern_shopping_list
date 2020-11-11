import React, { useEffect, useState } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

const ShoppingList = (props) => {
  // const [items, setItems] = useState(props.items.items);
  const { items, getItems, deleteItem } = props;

  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    console.log(typeof items);
    // console.log(typeof items[0]._id);
    console.log(items[0]);
  }, [items]);

  const onDelete = (id) => {
    deleteItem(id);
  };

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className='shopping-list'>
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={250} classNames='fade'>
              <ListGroupItem>
                <Button
                  className='remove-btn'
                  color='danger'
                  size='sm'
                  onClick={() => onDelete(_id)}
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
