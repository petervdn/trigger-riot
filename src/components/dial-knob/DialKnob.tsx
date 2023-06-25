type Props = {
  size: number;
};

export function DialKnob({ size }: Props) {
  const sizeDecrease = 10;
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: "dlightgray",
        position: "relative",
        cursor: "grab",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: size,
          height: size,
          borderRadius: "50%",
          // display: "inline-block",
          background: "linear-gradient(to top, #EEE, #F6F6F6)",
          // filter: "drop-shadow(0 16px 20px rgba(0,0,0,0.3))",
          //filter:
          boxShadow: "rgba(0, 0, 0, 0.3) 0px 4px 12px",
          // borderWidth: 4,
          // borderStyle: "solid",
          // borderImage: "linear-gradient(to right, darkblue, darkorchid) 1",
          // border: "1px solid #EEE",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: sizeDecrease * 0.5,
          top: sizeDecrease * 0.5,
          width: size - sizeDecrease,
          height: size - sizeDecrease,
          borderRadius: "50%",
          //display: "inline-block",
          background: "linear-gradient(to bottom, #EEE, #FFF)",
        }}
      />
    </div>
  );
}
