import { clientCredentials } from '../client';

const getCustomers = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getCustomerById = (customerId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/customers/${customerId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getCustomers, getCustomerById,
};
