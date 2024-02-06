// ./src/db/contacts.js

const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");
let cachedContacts = null;

async function listContacts() {
  try {
    if (!cachedContacts) {
      const data = await fs.readFile(contactsPath, "utf-8");
      cachedContacts = JSON.parse(data);
    }
    return cachedContacts;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contactToRemove = contacts.find(
      (contact) => contact.id === contactId
    );
    if (!contactToRemove) {
      return null;
    }

    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    cachedContacts = updatedContacts;
    return (contactToRemove);
  } catch (error) {
    throw new Error(`Error removing contact: ${error.message}`);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = { id: new Date().toISOString(), name, email, phone };
    const contacts = await listContacts();
    const updatedContacts = [...contacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    cachedContacts = updatedContacts;
    return newContact;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
