import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { ColorModeButton } from "./ui/color-mode";
// import { ColorModeButton } from "./ui/color-mode";

export default function Navbar(){
    return(
        <Container maxW={"900px"}>
            <Box bg={{base:"gray.300", _dark:"gray.700"}} px={4} my={4} borderRadius={5}>
                <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                    <Flex gap={3} alignItems={"center"} justifyContent={"center"} display={{ base: "none", sm: "flex" }}>
                        <img src="/react.png" alt="logo" width={50} height={50}/>
                        <Text fontSize={'40'}>+</Text>
                        <img src='/go.png' alt="logo" width={40} height={40} />
                        <Text fontSize={'40'}>=</Text>
                        <img src="/explode.png" alt="logo" width={50} height={50}/>
                    </Flex>
                    <Flex gap={3} alignItems={"center"}>
                        <Text fontSize={"lg"} fontWeight={500}>Daily Tasks</Text>
                        <ColorModeButton/>
                    </Flex>
                </Flex>
            </Box>
        </Container>
    );
}