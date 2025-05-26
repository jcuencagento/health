import React from 'react';
    import {
    Box,
    Flex,
    Text,
    IconButton,
    useColorMode,
    useColorModeValue
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

function Header() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box as="header" bg={useColorModeValue('gray.100', 'gray.900')} px={6} py={4} boxShadow="sm">
            <Flex justify="space-between" align="center">
                <Text fontSize="xl" fontWeight="bold">
                    My Total Health
                </Text>
                <IconButton
                    aria-label="Toggle dark mode"
                    icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    onClick={toggleColorMode}
                    variant="ghost"
                />
            </Flex>
        </Box>
    );
}

export default Header;
