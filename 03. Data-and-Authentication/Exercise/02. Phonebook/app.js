function attachEvents() {

    document.getElementById('btnLoad').addEventListener('click', loadContacts);
    document.getElementById('btnCreate').addEventListener('click', onCreate);

    loadContacts();
}

const list = document.getElementById('phonebook');
const personInput = document.getElementById('person');
const phoneInput = document.getElementById('phone');

attachEvents();

async function onCreate() {

    const person = personInput.value;
    const phone = phoneInput.value;
    const contact = { person, phone };

    await createContact(contact);

    list.appendChild(createItem(contact));
}

async function loadContacts() {

    const res = await fetch('http://localhost:3030/jsonstore/phonebook');
    const data = await res.json();

    list.replaceChildren(...Object.values(data).map(createItem));
}

function createItem(contact) {

    const liElement = document.createElement('li');
    liElement.innerHTML = `${contact.person}: ${contact.phone} <button>[Delete]</button>`;

    return liElement;
}

async function createContact(contact) {

    const res = await fetch('http://localhost:3030/jsonstore/phonebook', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    });

    const result = await res.json();

    return result;
}

async function deleteContact(id) {

    const res = await fetch('http://localhost:3030/jsonstore/phonebook/' + id, {
        method: 'delete'
    });
    const result = await res.json();

    return result;
}