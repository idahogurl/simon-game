import * as React from "react";
import { ReactElement } from "react";
import { animated, useSpring, config } from "react-spring";

interface ICountDisplayProps {
  on: boolean;
  count: string;
  blink: boolean;
  loopRef: any;
  dispatch: any;
}

export function CountDisplay(props: ICountDisplayProps): ReactElement {
  const { on, count, loopRef, dispatch } = props;

  const style = useSpring({
    config: { ...config.stiff, duration: 350 },
    loop: () => {
      if (props.blink) {
        debugger;
        return 3 > loopRef.current++;
      }
      return false;
    },
    from: { opacity: 0 },
    to: { opacity: 1 },
    onRest: () => {
      if (loopRef.current > 2) {
        // dispatch({
        //   type: ActionKind.ToggleBlink
        // });
      }
    }
  });

  return (
    <div className="block-center">
      <div id="count">
        <animated.div
          style={style}
          className={on ? "countDisplay-on" : "countDisplay-off"}
        >
          {count}
        </animated.div>
      </div>
      <div>count</div>
    </div>
  );
}
