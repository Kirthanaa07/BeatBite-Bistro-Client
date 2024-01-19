import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleOrder } from '../../../utils/data/orderData';
import OrderForm from '../../../components/forms/orderForm';

const UpdateOrder = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const [editOrder, setEditOrder] = useState({});

  useEffect(() => {
    getSingleOrder(orderId).then(setEditOrder);
  }, [orderId]);

  return (
    <div>
      <h2>Update Order</h2>
      <OrderForm existingOrder={editOrder} />
    </div>
  );
};

export default UpdateOrder;
