import { validateToken } from "@/lib/auth";
import { NextApiRequest } from "next";
import { NextApiRequestQuery } from "next/dist/server/api-utils";
import prisma from "@/lib/prisma";
import GradientLayout from "@/components/gradientLayout";
import SongsTable from "@/components/songsTable";

const getBGColor = () => {
    const colors = ['red', 'green', 'blue', 'orange', 'purple', 'gray', 'teal', 'yellow'];

    return colors[Math.floor(Math.random() * colors.length)];
}

export default function Playlist({ playlist }: { playlist: any }) {
    return (
        <GradientLayout
            color={getBGColor()}
            title={playlist.name}
            subtitle="playlist"
            description={`${playlist.songs.length} song${playlist.songs.length > 1 ? 's' : ''}`}
            image={`https://picsum.photos/400?random=${playlist.id}`}
        >
            <SongsTable songs={playlist.songs} />
        </GradientLayout>
    )
}

export async function getServerSideProps({ query, req }: { query: NextApiRequestQuery, req: NextApiRequest }) {
    let userId;
    try {
        userId = validateToken(req.cookies.ACCESS_TOKEN!);
    } catch (error) {
        return {
            redirect: {
                permanent: false,
                destination: '/signin'
            }
        }
    }

    const playlist = await prisma.playlist.findFirst({
        where: {
            id: +(query.id as string),
            userId,
        },
        include: {
            songs: {
                include: {
                    artist: {
                        select: {
                            name: true,
                            id: true,
                        }
                    }
                }
            }
        },
    });

    return {
        props: {
            playlist: JSON.parse(JSON.stringify(playlist))
        }
    }
}