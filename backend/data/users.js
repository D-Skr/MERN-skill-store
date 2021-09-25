import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('password', 10),
        isAdmin: true
    },
    {
        name: 'Ann Jackson',
        email: 'ann@example.com',
        password: bcrypt.hashSync('password', 10)
    },
    {
        name: 'Jack Caps',
        email: 'jack@example.com',
        password: bcrypt.hashSync('password', 10)
    },
]

export default users