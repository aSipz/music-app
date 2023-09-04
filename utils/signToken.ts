import jwt from 'jsonwebtoken';

export default (email: string, id: number) => jwt.sign(
    {
        email,
        id,
        time: Date.now()
    },
    process.env.JWT_SECRET as jwt.Secret,
    { expiresIn: '8h' }
);