function attachEvents() {


}

attachEvents();

async function loadContacts() {

    const res = await fetch('http://localhost:3030/jsonstore/phonebook');
    const data = await res.json();

    return data;
}

async function createContact(contact) {

    const res = await fetch('http://localhost:3030/jsonstore/phonebook', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    });

    const data = await res.json();

    return data;

}