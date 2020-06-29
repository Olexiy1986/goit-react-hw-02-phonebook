import React from "react";
import PropTypes from "prop-types";
import styles from "./ContactList.module.css";

const ContactList = ({ contacts, onRemove }) => {
  return (
    <ul>
      {contacts.map(({ id, name, number }) => (
        <li key={id}>
          <span className={styles.name}>{name}:</span>
          <span className={styles.number}>{number}</span>
          <button className={styles.removeButton} onClick={() => onRemove(id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onRemove: PropTypes.func.isRequired,
};

export default ContactList;
