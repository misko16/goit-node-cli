const fs = require('fs/promises');
const path = require('path');

const contactPath = path.join(__dirname, 'contacts.json');

async function listContact() {
    try {
        const data = await fs.readFile(contactPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactPath, 'utf-8');
        const contacts = JSON.parse(data);
        const contact = contacts.find(item => item.id === contactId);
        return contact || null;
    } catch (error) {
        return null;
    }
}

async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactPath, 'utf-8');
        const contacts = JSON.parse(data);
        const contactsIndex = contacts.findIndex(item => item.id === contactId);

        if (contactsIndex === -1) {
            return null;
        }

        const [removedContact] = contacts.splice(contactsIndex, 1);
        await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
        return removedContact;
    } catch (error) {
        return null;
    }
}

async function addContacts(name, email, phone) {
    try {
        const data = await fs.readFile(contactPath, 'utf-8');
        const contacts = JSON.parse(data);
        const newContact = { id: Date.now(), name, email, phone };
        contacts.push(newContact);

        await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
        return newContact;
    } catch (error) {
        return null;
    }
}

module.exports = {
    listContact,
    getContactById,
    removeContact,
    addContacts,
}
const contactsPath = require('./contacts.json');

let cachedContacts = null;

async function listContacts() {
  try {
    if (!cachedContacts) {
      const data = await fs.readFile(contactsPath, 'utf-8');
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
    return contacts.find(contact => contact.id === contactId);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    cachedContacts = updatedContacts; 
    return updatedContacts;
  } catch (error) {
    throw new Error(error.message);
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
  addContact
};
