import { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap';
import { closeOrder } from '../../utils/data/orderData';

const initialState = {
  status: 'Open',
  tip_amount: 0,
  payment_type: '',
};

const PaymentForm = ({ existingOrder }) => {
  const [paymentFormData, setPaymentFormData] = useState(initialState);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (existingOrder.id) {
      const update = {
        id: existingOrder.id,
        payment_type: paymentFormData.payment_type,
        tip_amount: paymentFormData.tip_amount,
      };
      closeOrder(update).then(() => router.push('/orders'));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Payment Type</Form.Label>
        <Form.Select
          name="payment_type"
          required
          value={paymentFormData.payment_type}
          onChange={handleChange}
        >
          <option value="">Select a payment type</option>
          <option value="Cash">Cash</option>
          <option value="Check">Check</option>
          <option value="Debit">Debit</option>
          <option value="Credit">Credit</option>
          <option value="Mobile-Payment">Mobile Payment</option>
        </Form.Select>
      </Form.Group>
      <br />
      <Form.Group className="mb-3">
        <Form.Label>Tip Amount</Form.Label>
        <Form.Control name="tip_amount" required value={paymentFormData.tip_amount} onChange={handleChange} />
      </Form.Group>
      <br />
      <Button className="mt-5 mb-5" variant="primary" type="submit"> Close Order </Button>
    </Form>
  );
};

PaymentForm.propTypes = {
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
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      item: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        price: PropTypes.number,
      }),
      quantity: PropTypes.number,
    })),
  }),
};

PaymentForm.defaultProps = {
  existingOrder: initialState,
};

export default PaymentForm;
