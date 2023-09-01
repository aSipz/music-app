import request from './fetch';

export const auth = (
    mode: 'signin' | 'signup',
    body: { email: string, password: string }
) => {
    return request(`/${mode}`, body);
};