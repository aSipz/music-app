import cookie from 'cookie';

export default (token: string) => cookie.serialize(
    'ACCESS_TOKEN',
    token,
    {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
    });
