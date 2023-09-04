import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import prisma from '../../lib/prisma';
import createCookie from '@/utils/createCookie';
import signToken from '@/utils/signToken';

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

        const token = signToken(user.email, user.id);

        res.setHeader(
            'Set-Cookie',
            createCookie(token),
        );
        res.json(user);
    }
};