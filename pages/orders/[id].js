import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getSingleOrder } from '../../utils/data/orderData';

function SingleOrder() {
  const [singleOrderDetails, setSingleOrderDetails] = useState({
    items: [],
    customer: {},
  });
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleOrder(id).then((data) => {
      setSingleOrderDetails(data);
    });
  }, []);

  return (
    <article className="items p-3">
      <h1>Order for {singleOrderDetails.customer.name} - ID: {singleOrderDetails.id}</h1>
      {singleOrderDetails.items && singleOrderDetails.items.length > 0 ? singleOrderDetails.items.map((orderitem) => (
        <div key={orderitem.id} className="d-flex justify-content-start gap-3">
          <span>{orderitem.item.name}</span>
          <span>${orderitem.item.price}</span>
          <span>X {orderitem.quantity}</span>
        </div>
      )) : <div>No Items</div>}
      <div className="d-flex flex-row justify-content-start gap-3 mt-3">
        <Button>
          Edit
        </Button>
        <Button>
          Delete
        </Button>
      </div>
    </article>
  );
}

export default SingleOrder;
