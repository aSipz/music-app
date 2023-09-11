import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Sidebar from './sidebar';
import PlayerBar from './playerBar';

export default function PlayerLayout({ children }: { children: ReactNode | ReactNode[] }) {
    return (
        <Box width='100vw' height='100vh'>
            <Box position='absolute' top='0' left='0' width='250px'>
                <Sidebar />
            </Box>
            <Box marginLeft='250px' marginBottom='100px'>
                <Box height="calc(100vh - 100px)">
                    {children}
                </Box>
            </Box>
            <Box position='absolute' bottom='0' left='0'>
                <PlayerBar />
            </Box>
        </Box>
    );
}