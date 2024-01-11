import OrderForm from '../../components/forms/orderForm';
import { useAuth } from '../../utils/context/authContext';

const NewOrder = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Create an Order</h2>
      <OrderForm user={user} />
    </div>
  );
};

export default NewOrder;
