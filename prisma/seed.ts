import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { artistsData } from './songsData';

const prisma = new PrismaClient();

const run = async () => {
    await Promise.all(artistsData.map(artist => {
        return prisma.artist.upsert({
            where: { name: artist.name },
            update: {},
            create: {
                name: artist.name,
                songs: {
                    create: artist.songs.map(s => ({
                        name: s.name,
                        duration: s.duration,
                        url: s.url,
                    })),
                },
            },
        })
    }));

    const salt = bcrypt.genSaltSync();
    const user = await prisma.user.upsert({
        where: { email: 'user@test.com' },
        update: {},
        create: {
            email: 'user@test.com',
            password: bcrypt.hashSync('password', salt),
            firstName: 'Angel',
            lastName: 'Ivanov',
            image: 'https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg',
        }
    });

    const songs = await prisma.song.findMany({});
    await Promise.all(new Array(10).fill(1).map((_, i) => {
        return prisma.playlist.create({
            data: {
                name: `Playlist #${i + 1}`,
                user: {
                    connect: { id: user.id }
                },
                songs: {
                    connect: songs.map(s => ({
                        id: s.id
                    })),
                },
            }
        })
    }));
};

run()
    .then()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });