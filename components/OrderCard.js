import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteOrder } from '../utils/data/orderData';

export default function OrderCard({ orderObj, onUpdate }) {
  const deleteThisOrder = () => {
    if (window.confirm('Delete this order?')) {
      deleteOrder(orderObj.id).then(() => onUpdate());
    }
  };
  return (
    <Card className="text-center">
      <Card.Header>{orderObj.customer.name}</Card.Header>
      <Card.Body><Card.Text>{orderObj.customer.email}</Card.Text>
        <Card.Text>{orderObj.customer.phone_number}</Card.Text>
        <Card.Text>{orderObj.order_type}</Card.Text>
        <Card.Text>{orderObj.order_date}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        <Button variant="primary" type="info">
          Info
        </Button>
        <Link href={`/orders/edit/${orderObj.id}`} passHref>
          <Button variant="success" type="edit">
            Edit
          </Button>
        </Link>
        <Button variant="danger" type="delete" onClick={deleteThisOrder}>
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );
}

OrderCard.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    order_type: PropTypes.string.isRequired,
    order_date: PropTypes.string.isRequired,
    customer: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string,
      phone_number: PropTypes.number,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
