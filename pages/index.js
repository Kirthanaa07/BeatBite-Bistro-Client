import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Welcome! {user.fbUser.displayName}! </h1>
      <Button variant="success" type="button" size="sm" className="copy-btn">
        View Orders
      </Button>
      <Button variant="primary" type="button" size="sm" className="copy-btn">
        Create an Order
      </Button>
      <Button variant="info" type="button" size="sm" className="copy-btn">
        View Revenue
      </Button>
    </div>
  );
}

export default Home;
