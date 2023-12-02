import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
  } from "react";
  
  const Spinner = forwardRef((props: any, passedRef: any) => {
    const [position, setPosition] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState<number>(parseInt(props.timer));
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
    let start: number;
    let iconHeight: number = 188;
    let speed: number;
    let multiplier: number = Math.floor(Math.random() * (4 - 1) + 1);
  
    
    function setStartPosition() {
      speed = iconHeight * multiplier;
      return Math.floor(Math.random() * 9) * iconHeight * -1;
    }
  
    function moveBackground() {
      setPosition((prevPosition) => prevPosition - speed);
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 100);
    }
 




    function getSymbolFromPosition() {
      const totalSymbols = 9;
      const maxPosition = iconHeight * (totalSymbols - 1) * -1;
      let moved = (props.timer / 100) * multiplier;
      let startPosition = start;
      let currentPosition = startPosition;
  
      for (let i = 0; i < moved; i++) {
        currentPosition -= iconHeight;
  
        if (currentPosition < maxPosition) {
          currentPosition = 0;
        }
      }
  
      props.onFinish(currentPosition);
    }
  
    function forceUpdateHandler() {
      reset();
    }
  
    function tick() {
      if (timeRemaining <= 0) {
        if (timerId) clearInterval(timerId);
        getSymbolFromPosition();
      } else {
        moveBackground();
      }
    }
  
    function reset() {
      if (timerId) {
        clearInterval(timerId);
      }
  
      start = setStartPosition();
      setPosition(start);
      setTimeRemaining(parseInt(props.timer));
      setTimerId(
        setInterval(() => {
          tick();
        }, 100)
      );
    }
  
    useEffect(() => {
      if (timerId) clearInterval(timerId);
  
      start = setStartPosition();
      setPosition(start);
      setTimeRemaining(parseInt(props.timer));
      setTimerId(
        setInterval(() => {
          tick();
        }, 100)
      );
  
      return () => {
        if (timerId) clearInterval(timerId);
      };
    }, []);
  
    useImperativeHandle(passedRef, () => ({
      forceUpdateHandler,
    }));
  
    return (
      <div
        style={{ backgroundPosition: `0px ${position}px` }}
        className={`icons`}
      />
    );
  });
  
  export default Spinner;

  


 
   