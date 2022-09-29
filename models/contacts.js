const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const Error = {
  INVALID_ID: "No contact with such ID.",
};

const write = async (newContact) => {
  await fs.writeFile(contactsPath, JSON.stringify(newContact, null, 2));
};

async function getlistContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch {
    console.log(Error.INVALID_ID);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await getlistContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      throw new Error(Error.INVALID_ID);
    }
    return contacts[index];
  } catch {
    console.log(Error.INVALID_ID);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await getlistContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) return null;
    const [result] = contacts.splice(index, 1);
    write(contacts);
    return result;
  } catch {
    console.log(Error.INVALID_ID);
  }
}

async function addContact(body) {
  try {
    const contacts = await getlistContacts();
    const newContact = { id: nanoid(), ...body };
    contacts.push(newContact);
    write(contacts);
    return newContact;
  } catch {
    console.log(Error.INVALID_ID);
  }
}
async function updateContact(contactId, body) {
  try {
    const contacts = await getlistContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) return null;
    const updatedContact = { ...contacts[index], ...body };
    const [result] = contacts.splice(index, 1, updatedContact).at(0);
    write(contacts);
    return result;
  } catch {
    console.log(Error.INVALID_ID);
  }
}

module.exports = {
  getlistContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
