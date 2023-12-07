// export const getLoser = () => {
//   return new Array(3).fill(Math.floor(Math.random() * 9));
// };

export const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const fillArray = (value: number) => {
  return new Array(3).fill(value);
};

// const fillWinningArrayWithValues=(value)=>{
//   return fillArray()
// }

const setWinningValues = (value: number) => {
  // value = getRandomNumber(0, 9); //remove when the value starts coming from the api
  return fillArray(value);
};
const setLosingValues = () => {
  //no arg needed since this function will only be called when the value is 0
  return Array.from({ length: fillArray(0).length }, () =>
    getRandomNumber(0, 9)
  );
};

export const setResult = (result: number) => {
  if (result == 0) return setLosingValues();
  else return setWinningValues(result);
};
export function WinningSound() {
  return (
    <audio autoPlay={true} className="player" preload="false">
      <source src="https://andyhoffman.codes/random-assets/img/slots/winning_slot.wav" />
    </audio>
  );
}

export function RepeatButton(props: any) {
  return (
    <button
      aria-label="Play again."
      id="repeatButton"
      onClick={props.onClick}
    ></button>
  );
}
