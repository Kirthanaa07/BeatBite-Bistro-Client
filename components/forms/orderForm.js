import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createOrder, updateOrder } from '../../utils/data/orderData';

const initialState = {
  user_id: 0,
  customer_name: '',
  customer_email: '',
  customer_phone: '',
  order_type: '',
  order_date: '',
  status: 'Open',
  tip_amount: 0,
  payment_type: '',
};

const OrderForm = ({ existingOrder }) => {
  // const [orderType, setOrderType] = useState([]);
  const [formOrderData, setFormOrderData] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // getOrderTypes().then(setOrderType);
    if (existingOrder.id) {
      setFormOrderData({
        id: existingOrder.id,
        user_id: existingOrder.user.id,
        customer_name: existingOrder.customer.name,
        customer_email: existingOrder.customer.email,
        customer_phone: existingOrder.customer.phone_number,
        order_type: existingOrder.order_type,
        order_date: existingOrder.order_date,
        payment_type: existingOrder.payment_type,
        tip_amount: existingOrder.tip_amount,
        status: existingOrder.status,
      });
    }
  }, [existingOrder, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormOrderData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    if (existingOrder.id) {
      const update = {
        id: existingOrder.id,
        user_id: user.id,
        customer_name: formOrderData.customer_name,
        customer_email: formOrderData.customer_email,
        customer_phone: formOrderData.customer_phone,
        order_type: formOrderData.order_type,
        order_date: formOrderData.order_date,
      };
      updateOrder(update).then(() => router.push('/orders'));
    } else {
      const order = {
        user_id: user.id,
        customer_name: formOrderData.customer_name,
        customer_email: formOrderData.customer_email,
        customer_phone: formOrderData.customer_phone,
        order_type: formOrderData.order_type,
        order_date: new Date(),
        payment_type: '',
        status: 'Open',
        tip_amount: 0,
      };

      // Send POST request to your API
      createOrder(order).then(() => router.push('/orders'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Enter Customer Name</Form.Label>
          <Form.Control name="customer_name" required value={formOrderData.customer_name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Customer Email</Form.Label>
          <Form.Control name="customer_email" required value={formOrderData.customer_email} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Enter Phone-number</Form.Label>
          <Form.Control name="customer_phone" required value={formOrderData.customer_phone} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>order Type</Form.Label>
          <Form.Select
            name="order_type"
            required
            value={formOrderData.order_type}
            onChange={handleChange}
          >
            <option value="">Select an order type</option>
            <option value="Call-in">Call-in</option>
            <option value="Walk-in">Walk-in</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit"> {existingOrder.id ? 'Update' : 'Create'} Order </Button>
      </Form>
    </>
  );
};

OrderForm.propTypes = {
  existingOrder: PropTypes.shape({
    id: PropTypes.number,
    order_date: PropTypes.string,
    order_type: PropTypes.string,
    payment_type: PropTypes.string,
    tip_amount: PropTypes.number,
    status: PropTypes.string,
    customer: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
      phone_number: PropTypes.string,
    }),
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
};

OrderForm.defaultProps = {
  existingOrder: initialState,
};

export default OrderForm;
