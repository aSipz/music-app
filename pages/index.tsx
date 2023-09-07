import GradientLayout from "@/components/gradientLayout";
import prisma from "@/lib/prisma";

export default function Home({ artists }: { artists: any }) {
  return (
    <GradientLayout color='red' title='Angel Ivanov' subtitle='profile' description='10 public playlists'>
      <div>Home page</div>
    </GradientLayout>
  );
}

export async function getServerSideProps() {
  // const artists = await prisma.artist.findMany({});
  const artists = JSON.parse(JSON.stringify(await prisma.artist.findMany({})));

  return {
    props: {
      artists
    },
  }
}