const { program } = require('commander');
const { addContacts, removeContact, getContactById, listContacts } = require('./src/db/contacts.js');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contactList = await listContacts();
      console.log('Contacts list:', contactList);
      break;

    case 'get':
      const findContact = await getContactById(id);
      console.log(findContact || 'Contact not can not be found');
      break;

    case 'add':
      const addContact = await addContacts(name, email, phone);
      console.log('Information about contact:', addContact);
      break;

    case 'remove':
      const deleteContact = await removeContact(id);
      console.log('Contact was deleted:', deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(program.opts());
