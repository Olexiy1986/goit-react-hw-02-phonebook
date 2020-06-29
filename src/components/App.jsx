import React, { Component } from "react";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import styles from "./App.module.css";

import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  handleAddContact = ({ name, number }) => {
    const { contacts } = this.state;

    if (contacts.some((contact) => contact.name === name)) {
      toast.warn(`${name} is already in contacts`, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [
        ...contacts,
        {
          id: uuidv4(),
          name,
          number,
        },
      ],
    }));
  };

  handleFilterChange = ({ filter }) => {
    this.setState({
      filter,
    });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;

    const filteredContacts = filter
      ? contacts.filter((contact) => contact.name.includes(filter))
      : contacts;

    return filteredContacts;
  };

  handleRemoveContact = (id) => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter((contact) => contact.id !== id),
    }));
  };

  render() {
    const { contacts } = this.state;

    return (
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <ContactForm onAdd={this.handleAddContact} />

        <h2>Contacts</h2>
        {contacts.length >= 2 && (
          <Filter onFilterChange={this.handleFilterChange} />
        )}

        <ContactList
          contacts={this.filterContacts()}
          onRemove={this.handleRemoveContact}
        />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

export default App;
