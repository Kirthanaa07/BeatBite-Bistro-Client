// import PropTypes from 'prop-types';
// import React from 'react';
// import { Card, Button } from 'react-bootstrap';
// import Link from 'next/link';
// import { deleteItem } from '../utils/data/itemData';

// function ItemCard({ itemObj, onUpdate }) {
//   const deleteThisItem = () => {
//     if (window.confirm('Delete this item?')) {
//       deleteItem(itemObj.id).then(() => onUpdate());
//     }
//   };
//   return (
//     <Card className="text-center">
//       <Card.Body>
//         <Card.Text>{itemObj.name}</Card.Text>
//         <Card.Text>{itemObj.price}</Card.Text>
//       </Card.Body>
//       <Link href={`/items/edit/${itemObj.id}`} passHref>
//         <Button variant="success" type="edit">
//           Edit
//         </Button>
//       </Link>
//       <Button variant="danger" type="delete" onClick={deleteThisItem}>
//         Delete
//       </Button>
//     </Card>
//   );
// }

// ItemCard.propTypes = {
//   itemObj: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//   }).isRequired,
//   onUpdate: PropTypes.func.isRequired,
// };

// export default ItemCard;
