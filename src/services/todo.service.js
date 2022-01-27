import axios from 'axios';

export const getTodos = () => {
    return axios.get('https://jsonplaceholder.typicode.com/todos/', {
        headers: {
            'Access-Control-Allow-Origin': 'https://jsonplaceholder.typicode.com/',
            'Accept' : 'application/json'
        }
    });
}

export const storeTodo = (todo) => {
    return axios.post('https://jsonplaceholder.typicode.com/todos/', todo, {
        headers: {
            'Access-Control-Allow-Origin': 'https://jsonplaceholder.typicode.com/',
            'Content-Type' : 'application/json; charset=UTF-8'
        }
    });
}

export const deleteTodo = (id) => {
    return axios.delete('https://jsonplaceholder.typicode.com/todos/' + id, {
        headers: {
            'Access-Control-Allow-Origin': 'https://jsonplaceholder.typicode.com/'
        }
    });
}

export const updateTodo = (id, todo) => {
    return axios.patch('https://jsonplaceholder.typicode.com/todos/' + id, todo, {
        headers: {
            'Access-Control-Allow-Origin': 'https://jsonplaceholder.typicode.com/',
            'Content-Type' : 'application/json; charset=UTF-8'
        }
    });
}

export const TodoSyncException = (message) => {
    this.message = message;
    this.name = 'TodoSyncException';
}