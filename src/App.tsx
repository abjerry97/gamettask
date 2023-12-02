import { useEffect, useRef, useState } from "react";
import Spinner from "./Spinner";

function RepeatButton(props: any) {
  return (
    <button
      aria-label="Play again."
      id="repeatButton"
      onClick={props.onClick}
    ></button>
  );
}

function WinningSound() {
  return (
    <audio autoPlay={true} className="player" preload="false">
      <source src="https://andyhoffman.codes/random-assets/img/slots/winning_slot.wav" />
    </audio>
  );
}

function App() {
  const _child1 = useRef<any>();
  const _child2 = useRef<any>();
  const _child3 = useRef<any>();
  const [winner, setWinner] = useState<any>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  let matches: any = [];

  function emptyArray() {
    matches = [];
  }

  function handleClick() {
    setWinner(null);
    emptyArray();
    _child1?.current?.onStart(2);
    _child2?.current?.onStart(1);
    _child3?.current?.onStart(1);
    setShouldAnimate(true)

    // setShouldAnimate(false)
  }

  function finishHandler(value: any) {
    matches.push(value);

    if (matches.length === 3) {
      const results = matches.every((match: any) => match === matches[0]);
      setWinner(results);
    }
  }

  useEffect(() => {
    // Use setTimeout to update the state after a delay
    const timeoutId = setTimeout(() => {
      setShouldAnimate(false);
      
    _child1?.current?.onFinish(2);
    _child2?.current?.onFinish(2);
    _child3?.current?.onFinish(1);
    }, 2000); // 2000 milliseconds (2 seconds)

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, [shouldAnimate]); // Empty dependency array ensures the effect runs only once after initial render


  // const getLoser = () => {
  //   return loser[Math.floor(Math.random() * loser.length)];
  // };
  // useEffect(() => {

  //     const interval = setInterval(() => {

  //       _child1?.current?.onFinish(2);
  //       _child2?.current?.onFinish(1);
  //       _child3?.current?.onFinish(1);

  //     }, 200);

  //     return () => {
  //       clearInterval(interval);
  //     };

  // }, [ ]);
  let repeatButton = null;
  let winningSound = null;

  if (true) {
    repeatButton = <RepeatButton onClick={handleClick} />;
  }

  if (winner) {
    winningSound = <WinningSound />;
  }

  return (
    <div>
      <div className={`spinner-container`}>
        <Spinner
          onFinish={finishHandler}
          shouldAnimate={shouldAnimate}
          ref={_child1}
          timer="1000"
        />
        <Spinner
          onFinish={finishHandler}
          shouldAnimate={shouldAnimate}
          ref={_child2}
          timer="1400"
        />
        <Spinner
          onFinish={finishHandler}
          shouldAnimate={shouldAnimate}
          ref={_child3}
          timer="2200"
        />
        <div className="gradient-fade"></div>
      </div>
      {repeatButton}
    </div>
  );
}

export default App;
