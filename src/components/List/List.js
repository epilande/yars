import React, { PropTypes } from 'react';
import ListItem from '../ListItem';
import styles from './List.css';

const List = ({ items, onRemove, onEdit, onComplete }) => (
  <ul className={styles.list}>
    {items.map(item =>
      <ListItem
        key={item.id}
        item={item}
        onRemove={onRemove}
        onEdit={onEdit}
        onComplete={onComplete}
      />
    )}
  </ul>
);

List.defaultProps = {
};

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  onRemove: PropTypes.func,
  onEdit: PropTypes.func,
  onComplete: PropTypes.func,
};

export default List;
