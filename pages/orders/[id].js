import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleOrder } from '../../utils/data/orderData';

function SingleOrder() {
  const [singleOrder, setSingleOrder] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleOrder(id).then((data) => setSingleOrder(data));
  }, [id]);

  return (
    <article className="single-game">
      <h1>Order</h1>
      <p>Name: {singleOrder.name}</p>
      <p>Order_type {singleOrder.order_type}</p>
      <p>Order_date: {singleOrder.order_date}</p>
    </article>
  );
}

export default SingleOrder;
