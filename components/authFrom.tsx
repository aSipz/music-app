import { Box, Flex, Input, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';
import { auth } from '../lib/api';
import { FC, SyntheticEvent, useState } from 'react';
import NextImage from 'next/image';

export default function AuthForm({ mode }: { mode: 'signin' | 'signup' }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const user = await auth(mode, { email, password });
            setIsLoading(false);
            router.push('/');
        } catch (error) {

        }

    };

    return (
        <Box height="100vh" width="100vw" bg='black' color="white">
            <Flex justify="center" align="center" height="100px" borderBottom="1px solid white">
                <NextImage src="/music-app-logo.svg" height={50} width={180} alt="logo"></NextImage>
            </Flex>
            <Flex justify="center" align="center" height="calc(100vh - 100px)">
                <Box padding="50px" bg="gray.900" borderRadius="6px">
                    <form onSubmit={handleSubmit}>
                        <Input
                            placeholder="email"
                            type="email"
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder="password"
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            bg="green.500"
                            isLoading={isLoading}
                            sx={{
                                "&:hover": {
                                    bg: "green.300"
                                }
                            }}
                        >
                            {mode}
                        </Button>
                    </form>
                </Box>
            </Flex>
        </Box>
    );
}