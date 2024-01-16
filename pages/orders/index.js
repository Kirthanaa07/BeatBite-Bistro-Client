import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import OrderCard from '../../components/OrderCard';
import { getOrders } from '../../utils/data/orderData';
import { useAuth } from '../../utils/context/authContext';

function Home() {
  const [orders, setOrders] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const getAllOrders = () => {
    getOrders(user.uid).then((data) => setOrders(data));
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <article className="orders">
      <h1>Orders</h1>
      <Button
        onClick={() => {
          router.push('/orders/new');
        }}
      >
        Create New Order
      </Button>
      {orders.map((order) => (
        <section key={`order--${order.id}`} className="order">
          <OrderCard orderObj={order} onUpdate={getAllOrders} />
        </section>
      ))}
    </article>
  );
}

export default Home;
