import { Box } from '@chakra-ui/layout';
import { ReactNode } from 'react';
import Sidebar from './sidebar';

export default function PlayerLayout({ children }: { children: ReactNode | ReactNode[] }) {
    return (
        <Box width='100vw' height='100vh'>
            <Box position='absolute' top='0' left='0' width='250px'>
                <Sidebar />
            </Box>
            <Box marginLeft='250px' marginBottom='100px'>
                {children}
            </Box>
            <Box position='absolute' bottom='0' left='0'>
                PLAYER
            </Box>
        </Box>
    );
}