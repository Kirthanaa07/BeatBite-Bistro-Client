import { Button } from 'react-bootstrap';
import Link from 'next/link';
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
      <Link passHref href="/orders">
        <Button variant="success" type="button" size="sm" className="copy-btn">
          View Orders
        </Button>
      </Link>
      <Link passHref href="/orders/new">
        <Button variant="primary" type="button" size="sm" className="copy-btn">
          Create an Order
        </Button>
      </Link>
      <Link passHref href="/">
        <Button variant="info" type="button" size="sm" className="copy-btn">
          View Revenue
        </Button>
      </Link>
    </div>
  );
}

export default Home;
