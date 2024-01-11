import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createOrder, getOrderTypes, updateOrder } from '../../utils/data/orderData';

const initialState = {
  user_id: 0,
  customer_id: 0,
  order_type: '',
  order_date: '',
  status: 'open',
  tip_amount: 0,
  payment_type: '',
};

const OrderForm = ({ orderObj }) => {
  const [orderType, setOrderType] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getOrderTypes().then(setOrderType);

    if (orderObj.id) {
      setCurrentOrder({
        user_id: orderObj.user_id,
        customer_id: orderObj.customer_id,
        order_type: orderObj.order_type,
        order_date: orderObj.order_date,
        payment_type: orderObj.payment_type,
        tip_amount: orderObj.tip_amount,
        status: orderObj.status,
      });
    }
  }, [orderObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    if (orderObj.id) {
      const update = {
        user_id: currentOrder.user_id,
        customer_id: currentOrder.customer_id,
        order_type: currentOrder.order_type,
        order_date: currentOrder.order_date,

      };
      updateOrder(update, user.uid).then(() => router.push('/orders'));
    } else {
      const order = {
        user_id: user.id,
        customer_id: currentOrder.customer_id,
        order_type: currentOrder.order_type,
        order_date: currentOrder.order_date,
      };

      // Send POST request to your API
      createOrder(order, user.uid).then(() => router.push('/orders'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" required value={currentOrder.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>order Maker</Form.Label>
          <Form.Control name="maker" required value={currentOrder.maker} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Number of Players</Form.Label>
          <Form.Control name="numberOfPlayers" required value={currentOrder.numberOfPlayers} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Skill Level(1-10)</Form.Label>
          <Form.Control name="skillLevel" required value={currentOrder.skillLevel} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>order Type</Form.Label>
          <Form.Select
            name="orderTypeId"
            required
            value={currentOrder.orderTypeId}
            onChange={handleChange}
          >
            <option value="">Select a order type</option>
            {orderType.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit"> {orderObj.id ? 'Update' : 'Create'} order </Button>
      </Form>
    </>
  );
};

OrderForm.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    number_of_players: PropTypes.number,
    skill_level: PropTypes.number,
    maker: PropTypes.string,
    name: PropTypes.string,
    order_type: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
  }),
};

OrderForm.defaultProps = {
  orderObj: initialState,
};

export default OrderForm;
