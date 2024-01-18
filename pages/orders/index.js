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
    <article className="orders p-3">
      <div className="d-flex flex-row justify-content-between">
        <h1>Orders</h1>
        <Button
          onClick={() => {
            router.push('/orders/new');
          }}
        >
          Create New Order
        </Button>
      </div>
      <div className="d-flex flex-row justify-content-start gap-2 flex-wrap">
        {orders.map((order) => (
          <OrderCard key={`order--${order.id}`} orderObj={order} onUpdate={getAllOrders} />
        ))}
      </div>
    </article>
  );
}

export default Home;
