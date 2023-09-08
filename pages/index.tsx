import { Box, Flex, Text, Image } from '@chakra-ui/react';
import GradientLayout from "@/components/gradientLayout";
import prisma from "@/lib/prisma";
import { useUser } from '@/lib/hooks';

type artist = {
  id: number;
  name: string;
  createdAt: string;
  updatedAr: string;
}

export default function Home({ artists }: { artists: artist[] }) {
  const { user, isLoading, error } = useUser();

  return (
    <GradientLayout
      color='green'
      title={user?.firstName + ' ' + user?.lastName}
      subtitle='profile'
      description={`${user?.playlistCount} public playlist${user?.playlistCount > 1 ? 's' : ''}`}
      image={user?.image}
      roundImage
    >

      <Box color='white' paddingX='40px'>
        <Box marginBottom='40px'>
          <Text fontSize='2xl' fontWeight='bold'>Top artist this month</Text>
          <Text fontSize='md'>Only visible for you</Text>
        </Box>
        <Flex gap='10px'>
          {artists.map(a => (
            <Box bg='gray.900' borderRadius='4px' padding='15px' key={a.id} flexBasis='20%'>
              <Image src='https://placekitten.com/300/300' borderRadius='100%' />
              <Box marginTop='20px'>
                <Text fontSize='large'>{a.name}</Text>
                <Text fontSize='x-small'>Artist</Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>

    </GradientLayout >
  );
}

export async function getServerSideProps() {
  const artists = await prisma.artist.findMany({});

  return {
    props: {
      artists: JSON.parse(JSON.stringify(artists))
    },
  }
}