import {
    ButtonGroup,
    Box,
    IconButton,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderTrack,
    RangeSliderThumb,
    Center,
    Flex,
    Text
} from '@chakra-ui/react';
import ReactHowler from 'react-howler';
import { useEffect, useRef, useState } from 'react';
import {
    MdShuffle,
    MdSkipNext,
    MdSkipPrevious,
    MdOutlinePlayCircleFilled,
    MdOutlinePauseCircleFilled,
    MdOutlineRepeat
} from 'react-icons/md';
import { useStoreActions } from 'easy-peasy';
import { Song } from '@prisma/client';
import { formatTime } from '@/utils/formatters';
import { Store } from '@/lib/store';

export default function Player({ songs, activeSong }: { songs: Song[]; activeSong: Song | null }) {
    const [playing, setPlaying] = useState(true);
    const [index, setIndex] = useState(songs.findIndex(s => s.id === activeSong?.id));
    const [seek, setSeek] = useState(0.0);
    const [isSeeking, setIsSeeking] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [duration, setDuration] = useState(0.0);
    const soundRef = useRef(null);
    const repeatRef = useRef(repeat);
    const setActiveSong: any = useStoreActions((state: Store) => state.changeActiveSong);

    useEffect(() => {
        let timerId: number | undefined;

        if (playing && !isSeeking) {
            const f = () => {
                setSeek((soundRef.current as unknown as ReactHowler).seek());
                timerId = requestAnimationFrame(f);
            }

            timerId = requestAnimationFrame(f);
            return () => cancelAnimationFrame(timerId!);
        }
        if (timerId) {
            cancelAnimationFrame(timerId);
        }
    }, [playing, isSeeking]);

    useEffect(() => {
        setActiveSong(songs[index]);
    }, [index, setActiveSong, songs]);

    useEffect(() => {
        repeatRef.current = repeat;
    }, [repeat]);

    const setPlayState = (value: boolean) => setPlaying(value);
    const onShuffle = () => setShuffle(state => !state);
    const onRepeat = () => setRepeat(state => !state);
    const onPrevSong = () => setIndex(state => state ? state - 1 : songs.length - 1);
    const onNextSong: any = () => setIndex((state: any) => {
        if (shuffle) {
            const next = Math.floor(Math.random() * songs.length);
            if (next === state) {
                return onNextSong();
            }
            return next;
        }

        return state == songs.length - 1 ? 0 : state + 1;
    });
    const onEnd = () => {
        if (repeatRef.current) {
            setSeek(0);
            (soundRef.current as unknown as ReactHowler).seek(0);
        } else {
            onNextSong();
        }
    };
    const onLoad = () => {
        const soundDuration = (soundRef.current as unknown as ReactHowler).duration();
        setDuration(soundDuration);
    };
    const onSeek = (e: any) => {
        setSeek(parseFloat(e[0]));
        (soundRef.current as unknown as ReactHowler).seek(e[0]);
    }

    return (
        <Box>
            <Box>
                <ReactHowler
                    playing={playing}
                    src={activeSong!.url}
                    ref={soundRef}
                    onLoad={onLoad}
                    onEnd={onEnd}
                />
            </Box>
            <Center color='gray.600'>
                <ButtonGroup>
                    <IconButton
                        outline='none'
                        variant='link'
                        aria-label='shuffle'
                        fontSize='24px'
                        icon={<MdShuffle />}
                        color={shuffle ? 'white' : 'gray.600'}
                        onClick={onShuffle}
                    />
                    <IconButton
                        outline='none'
                        variant='link'
                        aria-label='previous'
                        fontSize='24px'
                        icon={<MdSkipPrevious />}
                        onClick={onPrevSong}
                    />

                    {playing
                        ? <IconButton
                            outline='none'
                            variant='link'
                            aria-label='pause'
                            fontSize='40px'
                            color='white'
                            icon={<MdOutlinePauseCircleFilled />}
                            onClick={setPlayState.bind(null, false)}
                        />
                        : <IconButton
                            outline='none'
                            variant='link'
                            aria-label='play'
                            fontSize='40px'
                            color='white'
                            icon={<MdOutlinePlayCircleFilled />}
                            onClick={setPlayState.bind(null, true)}
                        />
                    }

                    <IconButton
                        outline='none'
                        variant='link'
                        aria-label='next'
                        fontSize='24px'
                        icon={<MdSkipNext />}
                        onClick={onNextSong}
                    />
                    <IconButton
                        outline='none'
                        variant='link'
                        aria-label='repeat'
                        fontSize='24px'
                        icon={<MdOutlineRepeat />}
                        color={repeat ? 'white' : 'gray.600'}
                        onClick={onRepeat}
                    />
                </ButtonGroup>
            </Center>
            <Box color='gray.600'>
                <Flex justify='center' align='center'>
                    <Box width='10%'>
                        <Text fontSize='xs'>{formatTime(seek)}</Text>
                    </Box>
                    <Box width='80%'>
                        <RangeSlider
                            aria-label={['min', 'max']}
                            step={0.1}
                            min={0}
                            max={duration}
                            id='player-range'
                            onChange={onSeek}
                            value={[seek]}
                            onChangeStart={() => setIsSeeking(true)}
                            onChangeEnd={() => setIsSeeking(false)}
                        >
                            <RangeSliderTrack bg='gray.800'>
                                <RangeSliderFilledTrack bg='gray.600' />
                            </RangeSliderTrack>
                            <RangeSliderThumb index={0} />
                        </RangeSlider>
                    </Box>
                    <Box width='10%' textAlign='right'>
                        <Text fontSize='xs'>{formatTime(duration)}</Text>
                    </Box>
                </Flex>
            </Box>
        </Box>
    )
}