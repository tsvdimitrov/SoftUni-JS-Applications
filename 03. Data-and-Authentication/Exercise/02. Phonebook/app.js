function attachEvents() {

    document.getElementById('btnLoad').addEventListener('click', loadMessages);
}

const list = document.getElementById('phonebook');

attachEvents();

async function loadContacts() {

    const res = await fetch('http://localhost:3030/jsonstore/phonebook');
    const data = await res.json();

    Object.values(data).map(createItem).forEach(i => list.appendChild(i));
}

function createItem(contact) {

    const liElement = document.createElement('li');
    liElement.innerHTML = `${contact.person}: ${contact.phone} <button>[Delete]</button`;

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