const data = [{
        id: '1',
        login: 'login1',
        password: '123',
        age: '23',
        isDeleted: 'false',
    },
    {
        id: '2',
        login: 'login1',
        password: '123',
        age: '23',
        isDeleted: 'false',
    },
    {
        id: '3',
        login: 'login1',
        password: '123',
        age: '23',
        isDeleted: 'false',
    },
    {
        id: '4',
        login: 'login1',
        password: '123',
        age: '23',
        isDeleted: 'false',
    },
    {
        id: '5',
        login: 'login1',
        password: '123',
        age: '23',
        isDeleted: 'false',
    },
    {
        id: '6',
        login: 'login1',
        password: '123',
        age: '23',
        isDeleted: 'false',
    },
    {
        id: '7',
        login: 'login1',
        password: '123',
        age: '23',
        isDeleted: 'false',
    },
    {
        id: '8',
        login: 'login1',
        password: '123',
        age: '23',
        isDeleted: 'false',
    },
    {
        id: '9',
        login: 'login1',
        password: '123',
        age: '23',
        isDeleted: 'false',
    },
    {
        id: '10',
        login: 'login1',
        password: '123',
        age: '23',
        isDeleted: 'false',
    },
]

const getAll = () => {
    return data;
}
const getItemById = (id) => {
    const item = data.find(item => item.id === id);
    return {
        data: item
    }
}

const removeItem = (id) => {
    const item = data.find(item => item.id === id);
    let isSuccess = false;
    if (item) {
        item.isDeleted = true;
        isSuccess = true;
    }
    return isSuccess;
}

const createUser = (login, password, age) => {
    data.push({
        id: data.length + 1,
        login,
        password,
        age,
        isDeleted: false,
    });
}

const updateUser = (id, login, password, age) => {
    const findedItem = data.find(item => item.id === id);
    if (!findedItem.id) {
        return {};
    }
    findedItem.login = login;
    findedItem.password = password;
    findedItem.age = age;
    return findedItem;
}

const getAutoSuggestUsers = (login, limit) => {
    return data.filter(item => item.login.includes(login)).slice(0, limit);
}

export default {
    getAll,
    getItemById,
    removeItem,
    createUser,
    updateUser,
    getAutoSuggestUsers
}