import { useEffect, useRef, useState } from "react";
import Spinner from "./Spinner";
import {
  RepeatButton,
  WinningSound,
  getRandomNumber,
  setResult,
} from "./helpers";

function App() {
  let result = 0;
  const _child1 = useRef<any>();
  const _child2 = useRef<any>();
  const _child3 = useRef<any>();
  const [winner, setWinner] = useState<any>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const spinners = [_child1, _child2, _child3];
  function handleClick() {
    setWinner(0);
    _child1?.current?.onStart();
    _child2?.current?.onStart();
    _child3?.current?.onStart();
    setShouldAnimate(true);
  }

  useEffect(() => {
    result = getRandomNumber(0, 2);
    const timeoutId = setTimeout(() => {
      setShouldAnimate(false);
      if (shouldAnimate) {
        setResult(result).forEach((result: number, index: number) => {
          spinners[index]?.current?.onFinish(result);
        });

        // alert(result)
      }
      if (result == 0 || result <1) {setWinner(false); }
      else setWinner(true);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [shouldAnimate]);

  let repeatButton = null;
  let winningSound = null;

  if (!shouldAnimate) {
    repeatButton = <RepeatButton onClick={handleClick} />;
  }

  if (winner) {
    winningSound = <WinningSound />;
  }

  return (
    <div>
      <div className="bg-white text-white opacity-100 z50">{winner}</div>
      <div className={`spinner-container`}>
        <Spinner shouldAnimate={shouldAnimate} ref={_child1} timer="1000" />
        <Spinner shouldAnimate={shouldAnimate} ref={_child2} timer="1400" />
        <Spinner shouldAnimate={shouldAnimate} ref={_child3} timer="2200" />
        <div className="gradient-fade"></div>
      </div>
      {repeatButton}
      {winningSound}
    </div>
  );
}

export default App;
