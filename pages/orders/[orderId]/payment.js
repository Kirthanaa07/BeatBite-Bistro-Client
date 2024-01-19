import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleOrder } from '../../../utils/data/orderData';
import PaymentForm from '../../../components/forms/paymentForm';

const UpdateOrder = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const [editOrder, setEditOrder] = useState({});

  useEffect(() => {
    getSingleOrder(orderId).then(setEditOrder);
  }, [orderId]);

  return (
    <div className="p-3">
      <h2>Close Order - {orderId}</h2>
      <PaymentForm existingOrder={editOrder} />
    </div>
  );
};

export default UpdateOrder;
