import NextImage from 'next/image';
import NextLink from 'next/link';
import { Box, List, ListItem, ListIcon, Divider, Center, LinkBox, LinkOverlay } from '@chakra-ui/layout';
import { musicMenu, navMenu } from '@/utils/menus';

const playlist = new Array(30).fill(1).map((_, i) => `Playlist ${i + 1}`);

export default function Sidebar() {
    return (
        <Box
            width='100%'
            height='calc(100vh - 100px)'
            bg='black'
            paddingX='5px'
            color='gray'
        >
            <Box paddingY='20px' height='100%'>
                <Box width='180px' marginBottom='20px' paddingX='20px'>
                    <NextLink href='/'>
                        <NextImage
                            src='/music-app-logo.svg'
                            width={150}
                            height={30}
                            alt='logo'
                        />
                    </NextLink>
                </Box>

                <Box marginBottom='20px'>
                    <List spacing={2}>
                        {navMenu.map(m => (
                            <ListItem key={m.name} paddingX='20px' fontSize='16px'>
                                <LinkBox>
                                    <NextLink href={m.route} passHref>
                                        <LinkOverlay>
                                            <ListIcon
                                                as={m.icon}
                                                color='white'
                                                marginRight='20px'
                                            />
                                            {m.name}
                                        </LinkOverlay>
                                    </NextLink>
                                </LinkBox>
                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Box marginBottom='20px'>
                    <List spacing={2}>
                        {musicMenu.map(m => (
                            <ListItem key={m.name} paddingX='20px' fontSize='16px'>
                                <LinkBox>
                                    <NextLink href={m.route} passHref>
                                        <LinkOverlay>
                                            <ListIcon
                                                as={m.icon}
                                                color='white'
                                                marginRight='20px'
                                            />
                                            {m.name}
                                        </LinkOverlay>
                                    </NextLink>
                                </LinkBox>
                            </ListItem>
                        ))}
                    </List>
                </Box >

                <Divider marginBottom='20px' color='gray.800' />

                <Box
                    height='66%'
                    overflowY='auto'
                    sx={{
                        '::-webkit-scrollbar': {
                            bg: 'transparent',
                            width: '10px'
                        },
                        '::-webkit-scrollbar-thumb': {
                            background: 'gray.500',
                            'border-radius': '10px'
                        }
                    }}
                >
                    <List spacing={2}>
                        {playlist.map(p => (
                            <ListItem paddingX='20px' key={p}>
                                <LinkBox>
                                    <NextLink href='/' passHref>
                                        <LinkOverlay>
                                            {p}
                                        </LinkOverlay>
                                    </NextLink>
                                </LinkBox>
                            </ListItem>
                        ))}
                    </List>
                </Box>

            </Box >
        </Box >
    );
}