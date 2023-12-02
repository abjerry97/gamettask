import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { getRandomNumber } from "./helpers";

const Spinner = forwardRef((props: any, passedRef: any) => {
  let iconHeight: number = 188;
  let imageLength = 18;
  let startPosition = getRandomNumber(0, 9) * iconHeight * -1;
  const [imagePosition, setImagePosition] = useState(0);
  const [finalPosition, setFinalPosition] = useState(startPosition);

  useEffect(() => {
    if (props.shouldAnimate) {
      const interval = setInterval(() => {
        setImagePosition((prevPosition) =>
          prevPosition >= imageLength ? 0 : prevPosition + 1
        );
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }
  }, [props.shouldAnimate]);

  function onFinish(index: any) {
    setFinalPosition(index * iconHeight * -1);
  }

  function onStart() {
    setFinalPosition(0);
  }

  useImperativeHandle(passedRef, () => ({
    onFinish,
    onStart,
  }));

  return (
    <div
      style={{
        backgroundPosition: `0px ${
          props.shouldAnimate
            ? iconHeight * startPosition * imagePosition
            : finalPosition
        }px`,
      }}
      className={`icons`}
    />
  );
});

export default Spinner;
