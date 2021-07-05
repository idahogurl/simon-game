import * as React from "react";
import { useEffect, CSSProperties } from "react";
// import { ActionKind } from "./reducer";

export function ControlButton(props) {
  const { on, dispatch, label, color } = props;
  console.log();
  const style: CSSProperties = {
    background: color,
    cursor: on ? "pointer" : "not-allowed"
  };

  return (
    <div className="block-center">
      <div
        // onClick={() => {
        //   if (on)
        //     dispatch({
        //       type:
        //         label === "start"
        //           ? ActionKind.StartGame
        //           : ActionKind.ToggleStrictMode,
        //     });
        // }}
        className="controlButton"
        style={style}
      ></div>
      {label}
    </div>
  );
}
