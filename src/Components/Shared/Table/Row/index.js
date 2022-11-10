import React from 'react';
import Button from '../../Button';
import styles from './row.module.css';

const Row = ({ headers, rowItem, deleteItem, editItem }) => {
  return (
    <tr className={styles.tr}>
      {headers?.map((header, index) => (
        <td key={index} className={styles.td}>
          {rowItem[header]}
        </td>
      ))}
      <td className={styles.td}>
        <span className={styles.btnContainer}>
          {editItem && (
            <Button
              icon={`${process.env.PUBLIC_URL}/assets/images/pen-to-square-solid.svg`}
              onClick={editItem}
            />
          )}
          {deleteItem && (
            <Button
              icon={`${process.env.PUBLIC_URL}/assets/images/trash-solid.svg`}
              onClick={deleteItem}
            />
          )}
        </span>
      </td>
    </tr>
  );
};

export default Row;