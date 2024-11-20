const express = require('express');// why we are using this // WHat Why How 
const bodyParser = require('body-parser'); // why we are using this // WHat Why How 
const fs = require('fs'); // why we are using this // WHat Why How 
const app = express(); // why we are using this // WHat Why How 
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Load contacts from a JSON file (acts as a simple database)
let contacts = require('./contacts.json');

// GET: Read all contacts
app.get('/api/contacts', (req, res) => {
    res.json(contacts);
});

// POST: Create a new contact
app.post('/api/contacts', (req, res) => {
    console.log("contacts initial:",contacts)
    const newContact = req.body;
    console.log("befor eid: ",newContact)

    newContact.id = contacts.length ? contacts[contacts.length - 1].id + 1 : 1; // check line 
    console.log("after id : ",newContact)
    contacts.push(newContact);
    console.log("contacts after updated:", contacts)
    fs.writeFileSync('./contacts.json', JSON.stringify(contacts, null, 2));
    res.status(201).json(newContact);
});

// PUT: Update an existing contact
app.put('/api/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedContact = req.body;
    const contactIndex = contacts.findIndex(c => c.id === id);

    if (contactIndex !== -1) {
        contacts[contactIndex] = { ...updatedContact, id };  // Preserve the original ID
        fs.writeFileSync('./contacts.json', JSON.stringify(contacts, null, 2));
        res.json(updatedContact);
    } else {
        res.status(404).json({ message: 'Contact not found' });
    }
});

// DELETE: Delete a contact
app.delete('/api/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const contactIndex = contacts.findIndex(c => c.id === id);

    if (contactIndex !== -1) {
        contacts.splice(contactIndex, 1);
        fs.writeFileSync('./contacts.json', JSON.stringify(contacts, null, 2));
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Contact not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running port:${port}`);
});
