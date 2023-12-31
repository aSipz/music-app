import { Box, Table, Thead, Td, Tr, Th, Tbody, IconButton } from '@chakra-ui/react';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { formatDate, formatTime } from '@/utils/formatters';
import { useStoreActions } from 'easy-peasy';
import { Store } from '@/lib/store';

export type Song = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    duration: number;
    url: string;
    artist: any;
    artistId: number;
    playlist: any
};

export default function SongsTable({ songs }: { songs: Song[] }) {
    const playSongs = useStoreActions((store: Store) => store.changeActiveSongs);
    const setActiveSong = useStoreActions((store: Store) => store.changeActiveSong);

    const handlePlay = (activeSong?: any) => {
        setActiveSong(activeSong || songs[0]);
        playSongs(songs as any);
    };

    return (
        <Box bg='transparent' color='white'>
            <Box padding='10px' marginBottom='20px'>
                <IconButton
                    icon={<BsFillPlayFill fontSize='30' />}
                    colorScheme='green'
                    size='lg'
                    isRound
                    aria-label='play'
                    onClick={() => handlePlay()}
                />
            </Box>
            <Table variant='unstyled'>
                <Thead borderBottom='1px solid' borderColor='rgba(255,255,255,0.2)'>
                    <Tr>
                        <Th>#</Th>
                        <Th>Title</Th>
                        <Th>Date Added</Th>
                        <Th>
                            <AiOutlineClockCircle />
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {songs.map((s, i) => (
                        <Tr
                            sx={{
                                transition: 'all .3s',
                                '&:hover': {
                                    bg: 'rgba(255,255,255,0.1)'
                                }
                            }}
                            key={s.id}
                            cursor='pointer'
                            onClick={() => handlePlay(s)}
                        >
                            <Td>{i + 1}</Td>
                            <Td>{s.name}</Td>
                            <Td>{formatDate(s.createdAt)}</Td>
                            <Td>{formatTime(s.duration)}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box >
    );
}