import { useEffect, useRef, useState } from "react";
import Spinner from "./Spinner";
import {
  RepeatButton,
  WinningSound,
  getRandomNumber,
  setResult,
} from "./helpers";

function App() {
  let result = useRef<any>();
  const _child1 = useRef<any>();
  const _child2 = useRef<any>();
  const _child3 = useRef<any>();
  const winner = useRef<any>();
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const spinners = [_child1, _child2, _child3];
  function handleClick() {
    winner.current = 0;
    _child1?.current?.onStart();
    _child2?.current?.onStart();
    _child3?.current?.onStart();
    setShouldAnimate(true);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShouldAnimate(false);
      if (shouldAnimate) {
        result.current = getRandomNumber(0, 2);
        let resultValues = setResult(result.current);
        resultValues.forEach((result: number, index: number) => {
          spinners[index]?.current?.onFinish(result);
        });

        // alert(result)
      }
      if (result.current == 0 || result.current < 1) {
        winner.current = false;
      } else winner.current = true;
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [shouldAnimate]);

  let repeatButton = null;
  let winningSound = null;

  if (!shouldAnimate) {
    repeatButton = <RepeatButton onClick={handleClick} />;
  }

  if (winner.current) {
    winningSound = <WinningSound />;
  }

  return (
    <div>
      <div
        className=""
        style={{
          backgroundColor: "#fff",
          width: "fit-content",
          margin:"auto",
          padding:".5em"

        }}
      >
        {" "}
        {result.current}
      </div>
      <div className={`spinner-container`}>
        <Spinner
          shouldAnimate={shouldAnimate}
          ref={_child1}
          timer="1000"
          offset={1}
        />
        <Spinner
          shouldAnimate={shouldAnimate}
          ref={_child2}
          timer="1400"
          offset={2}
        />
        <Spinner
          shouldAnimate={shouldAnimate}
          ref={_child3}
          timer="2200"
          offset={3}
        />
        <div className="gradient-fade"></div>
      </div>
      {repeatButton}
      {winningSound}
    </div>
  );
}

export default App;
