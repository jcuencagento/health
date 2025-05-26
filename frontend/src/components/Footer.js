import React from 'react';
import {
    Box,
    Flex,
    Text,
    Link,
    IconButton,
    Button,
    useColorModeValue
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

function Footer() {
    return (
        <Box as="footer" bg={useColorModeValue('gray.100', 'gray.900')} color={useColorModeValue('gray.700', 'gray.200')} py={4} px={6}>
            <Flex justify="space-between" align="center" flexWrap="wrap">
                <Text fontSize="sm">&copy; {new Date().getFullYear()} My Total Health</Text>
                <Flex gap={4} align="center">
                <Link href="https://github.com/jcuencagento/health" isExternal>
                    <IconButton
                        aria-label="GitHub"
                        icon={<FaGithub />}
                        variant="ghost"
                        size="sm"
                    />
                </Link>
                <Button size="sm" variant="outline" onClick={() => alert('Formulario de contacto próximamente.')}>
                    Contacto
                </Button>
                </Flex>
            </Flex>
        </Box>
    );
}

export default Footer;

