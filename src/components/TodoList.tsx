import React, { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  Input,
  Stack,
  Text,
  IconButton,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { FaPlus, FaCheck } from "react-icons/fa";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState("");

  const handleAddTodo = () => {
    if (newTodoText.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      text: newTodoText,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNewTodoText("");
  };

  const handleToggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <Flex mt={8}>
      <VStack align="start">
        <HStack>
          <Input
            bg="white"
            color="black"
            minWidth="30rem"
            padding={10}
            borderRadius="0.5rem"
            placeholder="Add a new task you would like to accomplish..."
            _placeholder={{ color: "gray.400" }}
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
          />
          <IconButton
            bg="#D55B3D"
            padding={2}
            aria-label="Add todo"
            icon={<FaPlus size="1.5rem" />}
            ml="1rem"
            onClick={handleAddTodo}
          />
        </HStack>
        <Stack spacing={2} mt={4} minWidth="50rem" gap={20}>
          {todos.map((todo) => (
            <Box
              key={todo.id}
              px={15}
              py={3}
              borderRadius="0.5rem"
              backgroundColor={
                todo.completed ? "rgba(253, 250, 230, 0.85)" : "white"
              }
              onClick={() => handleToggleTodo(todo.id)}
              cursor="pointer"
              display="flex"
              alignItems="center"
              gap="1rem"
              color="#D55B3D"
              _hover={{
                backgroundColor: "rgba(253, 250, 230, 0.85)",
                fontWeight: "600",
              }}
            >
              <Box
                mr={2}
                w={8}
                h={8}
                border="1px solid"
                borderColor="gray.400"
                bg={todo.completed ? "rgba(253, 250, 230, 0.85)" : "white"}
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {todo.completed && <FaCheck color="gray.400" />}
              </Box>
              <Text
                fontSize="1.05rem"
                textDecoration={todo.completed ? "line-through" : "none"}
                flex="1"
              >
                {todo.text}
              </Text>
            </Box>
          ))}
        </Stack>
      </VStack>
    </Flex>
  );
};

export default TodoList;
