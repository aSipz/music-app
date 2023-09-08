import { validateToken } from "@/lib/auth"
import { NextApiRequest } from "next"
import { NextApiRequestQuery } from "next/dist/server/api-utils"
import prisma from "@/lib/prisma"

export default function Playlist({ playlist }: { playlist: any }) {
    return (
        <div>{playlist.name}</div>
    )
}

export async function getServerSideProps({ query, req }: { query: NextApiRequestQuery, req: NextApiRequest }) {
    const userId = validateToken(req.cookies.ACCESS_TOKEN!);
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