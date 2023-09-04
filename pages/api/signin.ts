import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import prisma from '../../lib/prisma';
import createCookie from '@/utils/createCookie';
import signToken from '@/utils/signToken';

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
            } else {
                throw new Error('Now user with this email');
            }
        } catch (error) {
            res.status(401);
            res.json({ error: 'Wrong email or password' });
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