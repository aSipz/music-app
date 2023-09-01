import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../lib/prisma';
import createCookie from '@/utils/createCookie';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);


        let user;
        try {
            user = await prisma.user.create({
                data: {
                    email,
                    password: hash
                }
            });
        } catch (error) {
            res.status(401);
            res.json({ error: 'User already exists' });
            return;
        }

        const token = jwt.sign(
            {
                email: user.email,
                id: user.id,
                time: Date.now()
            },
            process.env.JWT_SECRET as jwt.Secret,
            { expiresIn: '8h' }
        );

        res.setHeader(
            'Set-Cookie',
            createCookie(token),
        );
        res.json(user);
    }
};