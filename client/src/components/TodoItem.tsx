import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function TodoItem({todo} : {todo:any}){
    return(
        <Flex alignItems={"center"} gap={2}>
            <Flex
                flex={1}
                alignItems={"center"}
                borderWidth={"1px"}
                borderColor={"gray.600"}
                p={2}
                borderRadius={"lg"}
                justifyContent={"space-between"}
            >
                <Text
                    color={todo.completed ? "green.200":"yellow.100"}
                    textDecoration={todo.completed ? "line-through":"none"}
                >
                    {todo.body}
                </Text>
                {todo.completed && (
                    <Badge ml={1} colorPalette="green" textTransform={"uppercase"}>
                        Done
                    </Badge>
                )}
                {!todo.completed && (
                    <Badge ml={1} colorPalette="yellow" textTransform={"uppercase"}>
                        In Progress
                    </Badge>
                )}
            </Flex>
            <Flex gap={2} alignItems={"center"}>
                <Box color={"green.500"} cursor={'pointer'}>
                    <FaCheckCircle size={20}/>
                </Box>
                <Box color={"red.500"} cursor={'pointer'}>
                    <MdDelete size={25}/>
                </Box>
            </Flex>
        </Flex>
    );
}