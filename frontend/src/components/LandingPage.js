import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react';

function LandingPage({ onLoginSuccess }) {
    const [formData, setFormData] = useState({ username: '', password: '', email: '' });
    const [message, setMessage] = useState('');
    const [tabIndex, setTabIndex] = useState(0); // 0 = Login, 1 = Registro
    const toast = useToast();

    const handleChange = e => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLogin = async e => {
        e.preventDefault();
        setMessage('');
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                username: formData.username,
                password: formData.password,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                toast({ title: 'Login exitoso', status: 'success', isClosable: true, position: 'center' });
                onLoginSuccess(data.user);
            } else {
                toast({ title: 'Error de login', description: data.error, status: 'error', isClosable: true, position: 'center' });
            }
        } catch (err) {
            toast({ title: 'Error de red', description: err.message, status: 'error', isClosable: true, position: 'center' });
        }
    };

    const handleRegister = async e => {
        e.preventDefault();
        setMessage('');
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                    email: formData.email,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                toast({ title: 'Registro exitoso', description: 'Ahora puedes iniciar sesión.', status: 'success', position: 'center' });
                setFormData({ username: '', password: '', email: '' });
                setTabIndex(0);
            } else {
                toast({ title: 'Error en registro', description: data.error, status: 'error', position: 'center' });
            }
        } catch (err) {
            toast({ title: 'Error de red', description: err.message, status: 'error', position: 'center' });
        }
    };

    return (
        <Container maxW="lg" py={12}>
            <Box textAlign="center" mb={6} py={6}>
                <Heading size="lg">Bienvenido a Health Web</Heading>
                <Text fontSize="md" color="gray.500">Autentícate para acceder a tu información</Text>
            </Box>
            <Tabs variant="enclosed" isFitted index={tabIndex} onChange={index => setTabIndex(index)}>
                <TabList>
                    <Tab>Login</Tab>
                    <Tab>Registro</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <form onSubmit={handleLogin}>
                            <VStack spacing={4}>
                                <FormControl isRequired>
                                    <FormLabel>Usuario</FormLabel>
                                    <Input name="username" value={formData.username} onChange={handleChange} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Contraseña</FormLabel>
                                    <Input type="password" name="password" value={formData.password} onChange={handleChange} />
                                </FormControl>
                                <Button colorScheme="teal" type="submit" width="full">Iniciar sesión</Button>
                            </VStack>
                        </form>
                    </TabPanel>
                    <TabPanel>
                        <form onSubmit={handleRegister}>
                            <VStack spacing={4}>
                                <FormControl isRequired>
                                    <FormLabel>Email</FormLabel>
                                    <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Usuario</FormLabel>
                                    <Input name="username" value={formData.username} onChange={handleChange} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Contraseña</FormLabel>
                                    <Input type="password" name="password" value={formData.password} onChange={handleChange} />
                                </FormControl>
                                <Button colorScheme="blue" type="submit" width="full">Registrarse</Button>
                            </VStack>
                        </form>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
}

export default LandingPage;
