import * as React from "react";
import { ReactElement } from "react";
import { animated, useSpring, config } from "react-spring";
export interface ISimonButtonProps {
  index: number;
  path: string;
  color: string;
  disabled: boolean;
  dispatch: any;
}

export function GamePadButton(props: ISimonButtonProps): ReactElement {
  const { index, path, color, disabled, dispatch } = props;
  // if clicked then go back and forth
  const style = useSpring({
    config: config.stiff,
    duration: 150,
    to: {
      fill: color
    }
  });
  return (
    <animated.path
      d={path}
      style={{ ...style, cursor: disabled ? "not-allowed" : "pointer" }}
      strokeWidth={15}
      stroke="#333333"
      // onClick={() =>
      //   dispatch({ type: ActionKind.AddUserInput, payload: index })
      // }
    />
  );
}
