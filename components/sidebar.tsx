import NextImage from 'next/image';
import NextLink from 'next/link';
import { Box, List, ListItem, ListIcon, Divider, Center, LinkBox, LinkOverlay } from '@chakra-ui/layout';
import { MdHome, MdSearch, MdLibraryMusic, MdPlaylistAdd, MdFavorite } from 'react-icons/md';

const navMenu = [
    {
        name: 'Home',
        icon: MdHome,
        route: '/'
    },
    {
        name: 'Search',
        icon: MdSearch,
        route: '/search'
    },
    {
        name: 'My Library',
        icon: MdLibraryMusic,
        route: '/library'
    },
];

export default function Sidebar() {
    return (
        <Box
            width='100%'
            height='calc(100vh - 100px)'
            bg='black'
            paddingX='5px'
            color='gray'
        >
            <Box paddingY='20px'>
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

            </Box>
            SIDEBAR
        </Box>
    );
}