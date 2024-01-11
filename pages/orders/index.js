import React, { useEffect, useState } from 'react';
import OrderCard from '../../components/OrderCard';
import { getOrders } from '../../utils/data/orderData';

function Home() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then((data) => setOrders(data));
  }, []);

  return (
    <article className="orders">
      <h1>Orders</h1>
      {orders.map((order) => (
        <section key={`order--${order.id}`} className="order">
          <OrderCard customer={order.customer} orderType={order.orderType} paymentType={order.payment_type} />
        </section>
      ))}
    </article>
  );
}

export default Home;
