const { program } = require("commander");
const {
  addContact,
  removeContact,
  getContactById,
  listContacts,
} = require("./src/db/contacts.js");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactList = await listContacts();
      console.table(contactList);
      break;

    case "get":
      const findContact = await getContactById(id);
      console.log(findContact || null);
      break;

    case "add":
      const addContacts = await addContact(name, email, phone);
      console.log("Contact added sucsesfull:", addContacts);
      break;

    case "remove":
      const deleteContact = await removeContact(id);
      const deletedContact = await getContactById(id);
      console.log(deletedContact || deleteContact); 
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(program.opts());
