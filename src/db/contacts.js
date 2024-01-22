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
};
