import { Badge, Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Todo } from "./TodoList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../App";


export default function TodoItem({todo} : {todo:Todo}){
    const queryClient = useQueryClient();
    const {mutate:updateTodo, isPending:isUpdating} = useMutation({
        mutationKey: ["updateTodo"],
        mutationFn: async () => {
            if(todo.completed) return alert("Todo is already completed")
            try{
                const res = await fetch(BASE_URL + `/todos/${todo._id}`,{
                    method: "PATCH"
                })
                const data = await res.json()
                if(!data.ok){
                    throw new Error(data.error || "Something went wrong")
                }
                return data
            }
            catch (error){
                console.log(error)
            }
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries({ queryKey:["todos"] });
        }
    })

    const {mutate: deleteTodo, isPending: isDeleting} = useMutation({
        mutationKey: ["deleteTodo"],
        mutationFn: async () => {
            try{
                const res = await fetch(BASE_URL + `/todos/${todo._id}`,{
                    method: "DELETE"
                });

                const data = await res.json();
                if(!res.ok){
                    throw new Error(data.error || "Something went wrong");
                }
                return data;

            } catch (error) {
                console.log(error)
            }
        },
        onSuccess:() => {
            queryClient.invalidateQueries({queryKey:['todos']})
        }
    });

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
                bg={{base:"gray.300", _dark:"black"}}
            >
                <Text
                    // color={todo.completed ? "green.200":"yellow.100"}
                    textDecoration={todo.completed ? "line-through":"none"}
                    color={todo.completed ? "green.600":"yellow.600"} _dark={{ color: todo.completed ? "green.200" : "yellow.200" }}

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
                <Box color={"green.500"} cursor={'pointer'} onClick={() => updateTodo()}>
                    {!isUpdating && <FaCheckCircle size={20} />}
                    {isUpdating && <Spinner size={"sm"} />}
                </Box>
                <Box color={"red.500"} cursor={'pointer'} onClick={() => deleteTodo()}>
                    {!isDeleting && <MdDelete size={25}/>}
                    {isDeleting && <Spinner size={"sm"} />}
                </Box>
            </Flex>
        </Flex>
    );
}