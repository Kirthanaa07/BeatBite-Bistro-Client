import PropTypes from 'prop-types';
import { React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Button } from 'react-bootstrap';

export default function ClosedOrderCard({ orderObj }) {
  const router = useRouter();
  const [orderTotal, setOrderTotal] = useState(0);
  useEffect(() => {
    const totalAmount = orderObj.items.reduce((accumulator, orderItem) => accumulator + (orderItem.item.price * orderItem.quantity), 0) + orderObj.tip_amount;
    setOrderTotal(totalAmount);
  }, []);

  function orderDetail(id) {
    router.push(`/orders/${id}`);
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
        <Card.Text>{orderObj.payment_type}</Card.Text>
        <Card.Text>Tip: {orderObj.tip_amount}</Card.Text>
        <Card.Text>Total: {orderTotal}</Card.Text>

        <Card.Text>{orderObj.order_close_date}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted d-flex flex-row justify-content-between">
        <Button variant="primary" onClick={() => orderDetail(orderObj.id)} type="info">
          Info
        </Button>
      </Card.Footer>
    </Card>
  );
}

ClosedOrderCard.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    order_type: PropTypes.string.isRequired,
    order_date: PropTypes.string.isRequired,
    order_close_date: PropTypes.string,
    payment_type: PropTypes.string,
    tip_amount: PropTypes.number,
    status: PropTypes.string,
    customer: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string,
      phone_number: PropTypes.string,
    }),
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      item: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        price: PropTypes.number,
      }),
      quantity: PropTypes.number,
    })),
  }).isRequired,
};
