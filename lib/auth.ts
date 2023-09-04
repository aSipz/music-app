import jwt from 'jsonwebtoken';
import prisma from './prisma';
import { NextApiRequest, NextApiResponse } from 'next';

type CustomNextApiHandler<T = any> = (req: NextApiRequest, res: NextApiResponse<T>, user?: any) => unknown | Promise<unknown>

export default function validateRoute(handler: CustomNextApiHandler) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const { ACCESS_TOKEN: token } = req.cookies;


        if (token) {
            let user;
            try {
                const { id }: any = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret);

                user = await prisma.user.findUnique({ where: { id } });
                user = {}

                if (!user) {
                    throw new Error('No such user');
                }

                return handler(req, res, user);
            } catch (error) {
                res.status(401);
                res.json({ error: 'Not Authorized' });
                return;
            }
        }

        res.status(401);
        res.json({ error: 'Not Authorized' });
    }
};