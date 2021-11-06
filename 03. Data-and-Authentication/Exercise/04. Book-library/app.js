const tbody = document.querySelector('tbody');
document.getElementById('loadBooks').addEventListener('click', loadBooks);

async function loadBooks() {

    const books = await request('http://localhost:3030/jsonstore/collections/books');

    const result = Object.entries(books).map(([id, book]) => createRow(id, book));
    tbody.replaceChildren(...result);
}

function createRow(id, book) {

    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>
        <button>Edit</button>
        <button data-id=${id}>Delete</button>
    </td>`;

    return row;
}

async function createBook(book) {

    const result = await request('http://localhost:3030/jsonstore/collections/books', {
        method: 'post',
        body: JSON.stringify(book)
    });

    return result;
}

async function updateBook(id, book) {

    const result = await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'put',
        body: JSON.stringify(book)
    });

    return result;
}

async function deleteBook(id) {

    const result = await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'delete',

    });

    return result;
}

async function request(url, options) {

    if (options && options.body != undefined) {
        Object.assign(options, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }

    const response = await fetch(url, options);

    if (response.ok != true) {
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }
    const data = await response.json();

    return data;
}