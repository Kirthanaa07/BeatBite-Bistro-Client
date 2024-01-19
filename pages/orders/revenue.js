import React, { useEffect, useState } from 'react';
import ClosedOrderCard from '../../components/ClosedOrderCard';
import { getClosedOrders } from '../../utils/data/orderData';
import { useAuth } from '../../utils/context/authContext';

function Revenue() {
  const [orders, setOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalTip, setTotalTip] = useState(0);
  const [totalWalkIn, setTotalWalkIn] = useState(0);
  const [totalCallIn, setTotalCallIn] = useState(0);
  const [paymentTypeTotals, setPaymentTypeTotals] = useState([]);

  const { user } = useAuth();

  const getAllClosedOrders = () => {
    getClosedOrders(user.uid).then((data) => {
      setOrders(data);
      const revenue = data.reduce((acc1, order) => acc1 + order.items.reduce((acc2, orderItem) => acc2 + (orderItem.item.price * orderItem.quantity), 0) + order.tip_amount, 0);
      setTotalRevenue(revenue);

      const tips = data.reduce((accumulator, order) => accumulator + order.tip_amount, 0);
      setTotalTip(tips);

      const walkIn = data.filter((order) => order.order_type === 'Walk-in').length;
      setTotalWalkIn(walkIn);

      const callIn = data.filter((order) => order.order_type === 'Call-in').length;
      setTotalCallIn(callIn);

      let paymentTypes = data.map((order) => order.payment_type);
      // get unique payment types
      paymentTypes = [...new Set(paymentTypes)];
      const counts = paymentTypes.map((paymentType) => {
        const paymentTypeCount = data.filter((order) => order.payment_type === paymentType).length;
        return {
          paymentType,
          count: paymentTypeCount,
        };
      });
      setPaymentTypeTotals(counts);
    });
  };

  useEffect(() => {
    getAllClosedOrders();
  }, []);

  return (
    <article className="orders p-3">
      <h1>Closed Orders</h1>
      <h3>Total Revenue: {totalRevenue}</h3>
      <h3>Total Tip: {totalTip}</h3>
      <h3>Total Walk-In: {totalWalkIn}</h3>
      <h3>Total Call-In: {totalCallIn}</h3>
      {paymentTypeTotals.map((total) => (
        <h3 key={total.paymentType}>{total.paymentType}: {total.count}</h3>
      ))}
      <div className="d-flex flex-row justify-content-start gap-2 flex-wrap">
        {orders.map((order) => (
          <ClosedOrderCard key={`order--${order.id}`} orderObj={order} onUpdate={getAllClosedOrders} />
        ))}
      </div>
    </article>
  );
}

export default Revenue;
