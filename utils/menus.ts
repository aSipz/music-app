import { MdHome, MdSearch, MdLibraryMusic, MdPlaylistAdd, MdFavorite } from 'react-icons/md';

export const navMenu = [
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

export const musicMenu = [
    {
        name: 'Create Playlist',
        icon: MdPlaylistAdd,
        route: '/'
    },
    {
        name: 'Favorites',
        icon: MdFavorite,
        route: '/favorites'
    },
];