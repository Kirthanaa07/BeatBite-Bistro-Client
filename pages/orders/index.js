import React, { useEffect, useState } from 'react';
import OpenOrderCard from '../../components/OpenOrderCard';
import { getOpenOrders } from '../../utils/data/orderData';
import { useAuth } from '../../utils/context/authContext';

function Home() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  const getAllOpenOrders = () => {
    getOpenOrders(user.uid).then((data) => setOrders(data));
  };

  useEffect(() => {
    getAllOpenOrders();
  }, []);

  return (
    <article className="orders p-3">
      <h1>Open Orders</h1>
      <div className="d-flex flex-row justify-content-start gap-2 flex-wrap">
        {orders.map((order) => (
          <OpenOrderCard key={`order--${order.id}`} orderObj={order} onUpdate={getAllOpenOrders} />
        ))}
      </div>
    </article>
  );
}

export default Home;
