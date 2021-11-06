
async function request(url, options) {

    if (options.body != undefined) {
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

async function loadBooks() {

    const books = await request('http://localhost:3030/jsonstore/collections/books');

    return books;
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
