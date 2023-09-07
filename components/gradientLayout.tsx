import { Box, Flex, Text, Image } from '@chakra-ui/react';
import { ReactNode } from 'react';

type GradientLayoutProps = {
    children?: ReactNode | ReactNode[];
    color?: string;
    image?: string;
    roundImage?: boolean;
    title?: string;
    subtitle?: string;
    description?: string;
};

export default function GradientLayout({
    children,
    color,
    image,
    roundImage,
    title,
    subtitle,
    description,
}: GradientLayoutProps) {

    return (
        <Box
            height='100%'
            overflowY='auto'
            bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
        >
            <Flex bg={`${color}.600`} padding='40px' align='end'>
                <Box padding='20px'>
                    <Image boxSize='160px' boxShadow='2xl' src={image} borderRadius={roundImage ? '100%' : '3px'} />
                </Box>
                <Box padding='20px' lineHeight='50px' color='white'>
                    <Text fontSize='x-small' fontWeight='bold' casing='uppercase' lineHeight='20px'>
                        {subtitle}
                    </Text>
                    <Text fontSize='6xl' fontWeight='bold'>
                        {title}
                    </Text>
                    <Text fontSize='x-small'>
                        {description}
                    </Text>
                </Box>
            </Flex>
            <Box paddingY='50px'>
                {children}
            </Box>
        </Box>
    );
}