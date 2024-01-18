import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleOrder } from '../../../utils/data/orderData';
import SingleOrder from '../../orders/[id]';

const UpdateOrder = () => {
  const router = useRouter();
  const { itemId } = router.query;
  const [editOrder, setEditOrder] = useState({});

  useEffect(() => {
    getSingleOrder(itemId).then(setEditOrder);
  }, [itemId]);

  return (
    <div>
      <h2>Update Item</h2>
      <SingleOrder orderObj={editOrder} />
    </div>
  );
};

export default UpdateOrder;
