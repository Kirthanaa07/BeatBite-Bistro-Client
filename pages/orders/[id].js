import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleOrder } from '../../utils/data/orderData';
import { Button } from 'react-bootstrap';

function SingleOrder() {
  const [singleOrderDetails, setSingleOrderDetails] = useState({ items: [] });
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleOrder(id).then((data) => {
      setSingleOrderDetails(data);
    });
  }, []);

  return (
    <article className="items">
      <h1>Order {singleOrderDetails.id}</h1>
      {singleOrderDetails.items && singleOrderDetails.items.length > 0 ? singleOrderDetails.items.map((orderitem) => (
        <div key={orderitem.id}>
          <div>Name: {orderitem.item.name}</div>
          <div>Price: {orderitem.item.price}</div>
          <div>Quantity: {orderitem.quantity}</div>
        </div>
      )) : <div>No Items</div>}
      <Button>
        Edit
      </Button>
      <Button>
        Delete
      </Button>
    </article>
  );
}

export default SingleOrder;
