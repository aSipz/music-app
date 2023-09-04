import useSWR from 'swr';
import apiRequest from './fetch';

export function useUser() {
    const { data, error } = useSWR('/get-user', apiRequest);

    return {
        user: data,
        isLoading: !data && !error,
        error
    };
}

export function usePlaylist() {
    const { data, error } = useSWR('/playlist', apiRequest);

    return {
        playlists: data as Playlist[],
        isLoading: !data && !error,
        error,
    };
}