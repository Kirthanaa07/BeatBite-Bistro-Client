import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth';

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    name: '',
    uid: user.uid,
    image: '',
    role: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.uid));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control as="textarea" name="name" required placeholder="Enter your full name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formImage">
        <Form.Label>Image</Form.Label>
        <Form.Control as="textarea" name="image" required placeholder="Enter your image link" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.image]: target.value }))} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formRole">
        <Form.Label>Role</Form.Label>
        <Form.Control as="textarea" name="role" required placeholder="Enter your role" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.role]: target.value }))} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
