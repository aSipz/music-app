import { Box, Flex, Text } from '@chakra-ui/react';
import Player from './player';
import { useStoreState } from 'easy-peasy';
import { Store } from '@/lib/store';

export default function PlayerBar() {
    const songs = useStoreState((state: Store) => state.activeSongs);
    const activeSong: any = useStoreState((state: Store) => state.activeSong);

    return (
        <Box height='100px' width='100vw' bg='gray.900' padding='10px'>
            <Flex align='center'>

                <Box padding='20px' color='white' width='30%'>
                    {activeSong &&
                        <>
                            <Text fontSize='large'>{activeSong.name}</Text>
                            <Text fontSize='sm'>{activeSong.artist.name}</Text>
                        </>}
                </Box>

                <Box width='40%'>
                    {activeSong &&
                        <Player songs={songs} activeSong={activeSong} />
                    }
                </Box>

            </Flex>
        </Box >
    );
} 