import { program } from "commander";
const {listContacts, getContactById, removeContact, addContact, addContact} = require('../db/contacts');

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
  try{
    switch (action) {
      case "list":
        const contactsList = await listContacts();
        console.log(`Contact list:`, contactsList);
        break;
  
      case "get":
        const findContact = await getContactById(id);
        console.log(`Finding contacts:`, findContact);
        break;
  
      case "add":
        const contactsAdding = await addContact(name, email, phone);
        console.log(`Adding contacts:`, contactsAdding);
        break;
  
      case "remove":
        const deleteContacts = await removeContact(id);
        console.log(`Delete contact:`, deleteContacts);
        break;
  
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  }catch(error){
    console.log(error.message);
  }
}

invokeAction(options);
