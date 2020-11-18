import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

const ShoppingList = (props) => {
  // const [items, setItems] = useState(props.items.items);
  const { isAuth, items, getItems, deleteItem } = props;

  useEffect(() => {
    getItems();
  }, [getItems]);

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
                {isAuth && (
                  <Button
                    className='remove-btn'
                    color='danger'
                    size='sm'
                    onClick={() => onDelete(_id)}
                  >
                    &times;
                  </Button>
                )}

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
  isAuth: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  getItems: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    items: state.item.items,
  };
};

const mapDispatchToProps = {
  getItems,
  deleteItem: (id) => deleteItem(id),
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);
