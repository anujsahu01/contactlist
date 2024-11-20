// Fetch and display all contacts
function loadContacts() {
    fetch('/api/contacts')
        .then(response => response.json())
        .then(data => {
            const contactList = document.getElementById('contact-list');
            contactList.innerHTML = '';
            data.forEach(contact => {
                contactList.innerHTML += `
                    <div class="contact">
                        <div>
                            <strong>${contact.name}</strong><br>
                            Email: ${contact.email}<br>
                            Phone: ${contact.phone}
                        </div>
                        <button onclick="editContact(${contact})">Edit</button>
                        <button onclick="deleteContact(${contact.id})">Delete</button>
                    </div>
                `;
            });
        });
}

const isEdit=0;
// Add a new contact
function addContact() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
if(isEdit){
    // Update
    fetch(`/api/contacts/${isEdit}`,{ body: JSON.stringify({ name, email, phone })}, { method: 'PUT' })
    .then(() => {
        loadContacts();  // Reload contacts
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
    });
}else{
    // Create
    fetch('/api/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, phone })
    })
    .then(response => response.json())
    .then(() => {
        loadContacts();  // Reload contacts
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
    });
}
   
}

// Delete a contact
function deleteContact(id) {
    fetch(`/api/contacts/${id}`, { method: 'DELETE' })
    .then(() => loadContacts());
}

// edit a contact
function editContact(contact) {
    console.log("conafct edit:",contact)
    document.getElementById('name').value = contact.name;
    document.getElementById('email').value = contact.email;
    document.getElementById('phone').value = contact.phone;
    isEdit=contact.id;
}

// Initialize the page by loading contacts
document.addEventListener('DOMContentLoaded', loadContacts);
