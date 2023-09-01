import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../lib/prisma';
import createCookie from '@/utils/createCookie';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        let user;

        try {
            user = await prisma.user.findUnique({ where: { email } });

            if (user) {
                const correctPass = await bcrypt.compare(password, user.password);
                if (!correctPass) {
                    throw new Error('Wrong password');
                }
            }
        } catch (error) {
            res.status(401);
            res.json({ error: 'Wrong email or password' });
            return;
        }

        const token = jwt.sign(
            {
                email: user!.email,
                id: user!.id,
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