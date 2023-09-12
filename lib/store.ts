import { createStore, action } from 'easy-peasy';

export const store = createStore({
    activeSongs: [],
    activeSong: null,
    changeActiveSongs: action((state: any, payload) => {
        state.activeSongs = payload;
    }),
    changeActiveSong: action((state: any, payload) => {
        state.activeSong = payload;
    }),
});

export type Store = {
    activeSongs: [];
    activeSong: null;
    changeActiveSongs: typeof action;
    changeActiveSong: typeof action;
}