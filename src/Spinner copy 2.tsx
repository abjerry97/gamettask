import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

const Spinner = forwardRef((props: any, passedRef: any) => {
  let iconHeight: number = 188;
  let imageLength = 18;
  const startPosition = Math.floor(Math.random() * 9) * iconHeight * -1;
  const [imagePosition, setImagePosition] = useState(0);
  const [finalPosition, setFinalPosition] = useState(startPosition);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (shouldAnimate) {
      const interval = setInterval(() => {
        setImagePosition((prevPosition) =>
          prevPosition >= imageLength ? 0 : prevPosition + 1
        );
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }
  }, [shouldAnimate]);

  function onFinish(index: any) {
    setFinalPosition(Math.floor(Math.random() * 9) * iconHeight * -1);
    setShouldAnimate(false); // Stop the animation when onFinish is called
  }

  function onStart(index: any) {
    setShouldAnimate(true); // Start the animation when onStart is called
    setFinalPosition(0);
  }

  useImperativeHandle(passedRef, () => ({
    onFinish,
    onStart,
  }));

  return (
    <div
      style={{
        backgroundPosition: `0px ${finalPosition}px`,
      }}
      className={`icons`}
    />
  );
});

export default Spinner;
