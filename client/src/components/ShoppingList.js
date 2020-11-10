import React, { useState } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';

const ShoppingList = () => {
  const [items, setItems] = useState([
    {
      id: uuidv4(),
      name: 'Item 1',
    },
    {
      id: uuidv4(),
      name: 'Item 2',
    },
    {
      id: uuidv4(),
      name: 'Item 3',
    },
    {
      id: uuidv4(),
      name: 'Item 4',
    },
  ]);
  return (
    <Container>
      <Button
        color='dark'
        style={{ marginBottom: '2em' }}
        onClick={() => {
          const name = prompt('Enter Item');
          if (name) {
            setItems([...items, { id: uuidv4(), name }]);
          }
        }}
      >
        Add item
      </Button>

      <ListGroup>
        <TransitionGroup className='shopping-list'>
          {items.map(({ id, name }) => (
            <CSSTransition key={id} timeout={250} classNames='fade'>
              <ListGroupItem>
                <Button
                  className='remove-btn'
                  color='danger'
                  size='sm'
                  onClick={() => {
                    setItems(
                      items.filter((item) => {
                        return item.id !== id;
                      }),
                    );
                  }}
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

export default ShoppingList;
