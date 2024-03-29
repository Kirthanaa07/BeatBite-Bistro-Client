import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';
import { Card, Button } from 'react-bootstrap';
import { deleteOrder } from '../utils/data/orderData';

export default function OpenOrderCard({ orderObj, onUpdate }) {
  const router = useRouter();
  const deleteThisOrder = () => {
    if (window.confirm('Delete this order?')) {
      deleteOrder(orderObj.id).then(() => onUpdate());
    }
  };

  function orderDetail(id) {
    router.push(`/orders/${id}`);
  }

  function editOrder(id) {
    router.push(`/orders/edit/${id}`);
  }

  return (
    <Card style={{ width: '18rem' }} className="card-color">
      <Card.Header>
        <div className="d-flex justify-content-between">
          <span>{orderObj.customer.name}</span>
          <span>{orderObj.status}</span>
        </div>
      </Card.Header>
      <Card.Body><Card.Text>{orderObj.customer.email}</Card.Text>
        <Card.Text>{orderObj.customer.phone_number}</Card.Text>
        <Card.Text>{orderObj.order_type}</Card.Text>
        <Card.Text>{orderObj.order_date}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted d-flex flex-row justify-content-between">
        <Button variant="primary" onClick={() => orderDetail(orderObj.id)} type="info">
          Info
        </Button>
        {orderObj.status === 'Open' ? (
          <>
            <Button variant="success" type="edit" onClick={() => editOrder(orderObj.id)}>
              Edit
            </Button>
            <Button variant="danger" type="delete" onClick={deleteThisOrder}>
              Delete
            </Button>
          </>
        ) : <></>}

      </Card.Footer>
    </Card>
  );
}

OpenOrderCard.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    order_type: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    order_date: PropTypes.string.isRequired,
    customer: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string,
      phone_number: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
