import React from 'react';
import Button from '../Button';
import styles from './row.module.css';

const Row = ({ listItems, deleteItem, editItem }) => {
  return (
    <tr className={styles.tr}>
      {listItems?.map((item) => (
        <td key={item._id} className={styles.td}>
          {item}
        </td>
      ))}
      <div className={styles.btnContainer}>
        {editItem ? (
          <Button
            style={styles.btnEdit}
            icon={`${process.env.PUBLIC_URL}/assets/images/pen-to-square-solid.svg`}
            onClick={editItem}
          />
        ) : null}
        {deleteItem ? (
          <Button
            icon={`${process.env.PUBLIC_URL}/assets/images/trash-solid.svg`}
            onClick={deleteItem}
          />
        ) : null}
      </div>
    </tr>
  );
};

export default Row;
