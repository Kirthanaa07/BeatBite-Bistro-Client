import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const OrderCard = ({
  order,
}) => (
  <Card className="text-center">
    <Card.Header>{order.customer.name}</Card.Header>
    <Card.Body>
      <Card.Title>{order.order_type}</Card.Title>
      <Card.Text>{order.order_date}</Card.Text>
    </Card.Body>
    <Card.Footer className="text-muted">
      <Button variant="primary" type="info">
        Info
      </Button>
      <Button variant="success" type="edit">
        Edit
      </Button>
      <Button variant="danger" type="delete">
        Delete
      </Button>
    </Card.Footer>
  </Card>
);

OrderCard.propTypes = {
  order: PropTypes.string.isRequired,
};

export default OrderCard;
