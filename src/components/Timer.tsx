import React, { useState, useEffect } from "react";
import { Center, ButtonGroup, Box, Heading } from "@chakra-ui/react";

const Timer: React.FC = () => {
  const [workTime, setWorkTime] = useState(2);
  const [breakTime, setBreakTime] = useState(2);
  const [currentTime, setCurrentTime] = useState(workTime);
  const [isActive, setIsActive] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [isWorkSession, setIsWorkSession] = useState(true);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (currentTime === 0 && isActive) {
      if (isWorkSession) {
        setIsWorkSession(false);
        setCurrentTime(breakTime);
        setIsActive(true);
      } else {
        setIsWorkSession(true);
        setCurrentTime(workTime);
        setCycles((prevCycles) => prevCycles + 1);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, currentTime, workTime, breakTime, isWorkSession]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    if (!isActive) {
      isWorkSession ? setCurrentTime(workTime) : setCurrentTime(breakTime);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <Center
        width="50vw"
        paddingY="3rem"
        paddingX="5rem"
        borderRadius="2rem"
        bg="rgba(253, 250, 230, 0.85)"
        boxShadow="lg"
        flexDirection="column"
        justifyContent="flex-start"
        marginTop="4rem"
      >
        <Heading
          as="h1"
          mt="0rem"
          mb="-1.2rem"
          fontSize="1.75rem"
          color="#D55B3D"
        >
          {isWorkSession ? "Time to Focus!" : "Take a Break! :)"}
        </Heading>
        <Heading size="h1" fontSize="8rem" mt="0" mb="-0.5rem" color="#D55B3D">
          {formatTime(currentTime)}
        </Heading>
        <ButtonGroup
          gap="3rem"
          width="40%"
          fontSize="1rem"
          justifyContent="space-around"
        >
          {isActive ? (
            <Box
              as="button"
              width="10rem"
              textColor="#D55B3D"
              onClick={toggleTimer}
              textAlign="center"
              _hover={{ bg: "#b34d34", textColor: "white" }}
            >
              Pause
            </Box>
          ) : (
            <Box
              as="button"
              width="10rem"
              backgroundColor="#D55B3D"
              onClick={toggleTimer}
            >
              Start
            </Box>
          )}
          <Box
            as="button"
            width="10rem"
            backgroundColor="#D55B3D"
            onClick={resetTimer}
          >
            Reset
          </Box>
        </ButtonGroup>
      </Center>
      <Heading mt="3rem" fontSize="1.5rem" color="#D55B3D">
        Great job! You're now on Cycle {cycles}!
      </Heading>
    </>
  );
};

export default Timer;
