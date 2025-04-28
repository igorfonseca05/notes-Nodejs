let users = []

function addUser({ id, username, room }) {

    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    if (!username || !room) {
        return { error: 'Informe nome de usuário e sala' }
    }

    const existingUser = users.find(user => user.room === room && user.username === username)

    // console.log(existingUser)

    if (existingUser) {
        return { error: 'username está em uso!' }
    }

    const user = { id, username, room }
    users.push(user)
    return { user }
}


addUser({ id: 23, username: 'Igor', room: 'Vilas' })
addUser({ id: 3, username: 'Igor2', room: 'Vilas' })


function removeUser(id) {
    const removedUser = users.filter((user) => user.id !== id)
    users = removedUser
}


function getUser(id) {
    const user = users.find(user => user.id === id)
    return user
}

function getUsersInRoom(room) {
    const usersInRoom = users.filter(user => user.room === room.trim().toLowerCase())
    return usersInRoom
}


module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
    users
}