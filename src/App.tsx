import React, { useState, useEffect } from "react";
import { Flex, Heading, ButtonGroup, Box, Center } from "@chakra-ui/react";
import TodoList from "./components/TodoList";
import Timer from "./components/Timer";

const App: React.FC = () => {
  return (
    <Flex
      minHeight="100vh"
      width="100vw"
      flexDirection="column"
      backgroundColor="rgba(236, 158, 134, 0.72)"
      justifyContent="center"
      alignItems="center"
      overflowY="auto"
    >
      <Box
        backgroundColor="rgba(255,255,255,0.2)"
        width="100%"
        p={4}
        mb={4}
        textAlign="center"
      >
        <Heading fontSize="1.2rem" color="black">
          Pomodoro Timer
        </Heading>
      </Box>
      <Center flex="1" flexDirection="column" zIndex="1000">
        <Timer />
        <Box marginBottom="4rem">
          <Heading fontSize="1.5rem" color="#D55B3D">
            Your To-Do List:
          </Heading>
          <TodoList />
        </Box>
      </Center>
    </Flex>
  );
};

export default App;
