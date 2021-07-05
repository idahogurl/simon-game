// User Story: I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses.

// User Story: I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over.
import "./styles.css";
import "./slider.css";

import * as React from "react";
import { ReactElement } from "react";
import { useEffect, useRef, useCallback, useReducer } from "react";
import Chance from "chance";
import { IButton, toggleSwitch } from "./gameSlice";

import { RootState } from "./store";
import { useAppDispatch, useAppSelector } from "./hooks";

import { PowerSwitch } from "./PowerSwitch";
import { ControlButton } from "./ControlButton";
import { Howl, HowlOptions } from "howler";
import { GameCanvas } from "./GameCanvas";
import { GamePadButton } from "./GamePadButton";
import { CountDisplay } from "./CountDisplay";

// const INITIAL_COUNT_VALUE = "--";

// const INITIAL_BUTTONS = [
//   {
//     id: "green",
//     path:
//       "M 300 300 L 30 300 A 270 270 0 0 1 300 30 L 300 300 A 0 0 0 0 0 300 300",
//     color: "#00a74a",
//     prevColor: "#13FF7C",
//     soundFile: "simonSound1.mp3",
//     clicked: false
//   },
//   {
//     id: "red",
//     path:
//       "M 300 300 L 300 30 A 270 270 0 0 1 570 300 L 300 300 A 0 0 0 0 0 300 300",
//     color: "#9f0f17",
//     prevColor: "#FF4C4C",
//     soundFile: "simonSound2.mp3",
//     clicked: false
//   },
//   {
//     id: "yellow",
//     path:
//       "M 300 300 L 300 570 A 270 270 0 0 1 30 300 L 300 300 A 0 0 0 0 0 300 300",
//     color: "#cca707",
//     prevColor: "#FED93F",
//     soundFile: "simonSound3.mp3",
//     clicked: false
//   },
//   {
//     id: "blue",
//     path:
//       "M 300 300 L 570 300 A 270 270 0 0 1 300 570 L 300 300 A 0 0 0 0 0 300 300",
//     color: "#094a8f",
//     prevColor: "#1C8CFF",
//     soundFile: "simonSound4.mp3",
//     clicked: false
//   }
// ];

// const INITIAL_STATE: State = {
//   strictMode: false,
//   sequence: [],
//   sequencePlayed: [],
//   userInput: [],
//   count: INITIAL_COUNT_VALUE,
//   prevCount: INITIAL_COUNT_VALUE,
//   doBlink: false,
//   on: false,
//   userTurn: false,
//   buttons: INITIAL_BUTTONS
// };

// export default function SimonGame(): ReactElement {
//   const counterDisplayRef = useRef(0);
//   const game = useAppSelector((state: RootState) => state.game);
//   //const game = { buttons: [] };
//   const isBlinking = useRef(false);
//   // const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

//   const {
//     strictMode,
//     sequence,
//     sequencePlayed,
//     userInput,
//     count,
//     doBlink,
//     on,
//     userTurn,
//     buttons
//   } = game;

//   // //randomly select a button index and add to sequence
//   // const addStep = useCallback(() => {
//   //   let chance = new Chance();
//   //   let randomNum: number = chance.integer({ min: 0, max: 3 });
//   //   console.log("random", randomNum);
//   //   dispatch({ type: ActionKind.AddStep, payload: randomNum });
//   // }, []);

//   // // after stop blinking play the sequence
//   // useEffect(() => {
//   //   console.log("blink changed", doBlink);
//   //   if (doBlink) {
//   //     isBlinking.current = true;
//   //   }
//   //   if (!doBlink && isBlinking.current) {
//   //     isBlinking.current = false;
//   //     counterDisplayRef.current = 0;
//   //     if (count === INITIAL_COUNT_VALUE) {
//   //       dispatch({ type: ActionKind.SetCount, payload: "01" });
//   //     } else {
//   //       //other wise the user pressed wrong color
//   //       setTimeout(() => {
//   //         dispatch({
//   //           type: ActionKind.ResetSequencePlayed,
//   //           payload: undefined
//   //         });
//   //       }, 500);
//   //     }
//   //   }
//   // }, [doBlink, count]);

//   // useEffect(() => {
//   //   if (count === "01" && sequence.length === 0) {
//   //     setTimeout(() => {
//   //       addStep();
//   //     }, 1000);
//   //   }
//   // }, [count, sequence, addStep]);

//   // useEffect(() => {
//   //   if (sequence.length) {
//   //     if (sequencePlayed.length === sequence.length) {
//   //       // all played
//   //       dispatch({ type: ActionKind.ToggleUserTurn, payload: undefined });
//   //     } else if (sequencePlayed.length < sequence.length) {
//   //       dispatch({
//   //         type: ActionKind.ToggleClickedButton,
//   //         payload: sequence[sequencePlayed.length]
//   //       });
//   //     }
//   //   }
//   // }, [sequence, sequencePlayed]);

//   // // useEffect(() => {
//   // //   if (count !== "!!" && sequence.length && !userTurn) {
//   // //     if (sequencePlayed.length === sequence.length) {
//   // //       // all played
//   // //       dispatch({ type: ActionKind.ToggleUserTurn, payload: undefined });
//   // //     } else if (sequencePlayed.length < sequence.length) {
//   // //       dispatch({
//   // //         type: ActionKind.ToggleClickedButton,
//   // //         payload: sequence[sequencePlayed.length]
//   // //       });
//   // //     }
//   // //   }
//   // // }, [count, sequence, userTurn, sequencePlayed]);

//   // useEffect(() => {
//   //   const clickedIndex = buttons.findIndex((b) => b.clicked);
//   //   if (clickedIndex !== -1) {
//   //     if (userTurn) {
//   //       setTimeout(() => {
//   //         dispatch({
//   //           type: ActionKind.ToggleClickedButton,
//   //           payload: userInput[userInput.length - 1]
//   //         });
//   //       }, 250);
//   //     } else {
//   //       // unclick it, toggle color
//   //       setTimeout(() => {
//   //         dispatch({
//   //           type: ActionKind.SetSequencePlayed,
//   //           payload: clickedIndex
//   //         });
//   //       }, 250);
//   //     }
//   //   }
//   // }, [buttons, userTurn, userInput]);

//   // useEffect(() => {
//   //   console.log("doBlink", doBlink);
//   //   if (!doBlink) {
//   //     console.log("doBlink is false", doBlink);
//   //     counterDisplayRef.current = 0;
//   //     console.log("sequencePlayed.length", sequencePlayed.length);
//   //     if (sequencePlayed.length && sequence.length === sequencePlayed.length) {
//   //       setTimeout(() => {
//   //         debugger;
//   //         dispatch({
//   //           type: ActionKind.ResetSequencePlayed,
//   //           payload: undefined
//   //         });
//   //       }, 250);
//   //     }
//   //   }
//   // }, [doBlink, sequence, sequencePlayed]);

//   return (
//     <>
//       <div id="gameCanvas">
//         <GameCanvas>
//           {buttons.map((button, index) => {
//             const { path, id, color } = button;
//             return (
//               <GamePadButton
//                 key={id}
//                 index={index}
//                 path={path}
//                 color={color}
//                 disabled={count === INITIAL_COUNT_VALUE}
//                 dispatch={{}}
//               />
//             );
//           })}
//         </GameCanvas>
//       </div>
//       <div id="gameControls">
//         <div id="control-text">
//           <h1>
//             Simon<span id="reg">&reg;</span>
//           </h1>
//           <div className="row">
//             <div className="col-xs-4 col-xs-offset-8">
//               <div
//                 className={
//                   "block-center strict " +
//                   (strictMode ? "strict-on" : "strict-off")
//                 }
//               ></div>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-xs-5 text-center">
//               <CountDisplay
//                 count={count}
//                 on={on}
//                 blink={doBlink}
//                 loopRef={counterDisplayRef}
//                 // dispatch={dispatch}
//                 // callback={() => {
//                 //   //if (on) {
//                 //   dispatch({
//                 //     type: ActionKind.ToggleBlink,
//                 //     payload: count === INITIAL_COUNT_VALUE ? "01" : undefined
//                 //   });
//                 // } else {
//                 //   dispatch({
//                 //     type: ActionKind.StartGame,
//                 //     payload: undefined
//                 //   });
//                 // }
//                 //}}
//               />
//             </div>
//             <div className="col-xs-3">
//               <ControlButton
//                 //dispatch={dispatch}
//                 color="red"
//                 label="start"
//                 on={on}
//               />
//             </div>
//             <div className="col-xs-4">
//               <ControlButton
//                 //dispatch={dispatch}
//                 color="yellow"
//                 label="strict"
//                 on={on}
//               />
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-xs-12">
//               <PowerSwitch
//                 on={on}
//                 //dispatch={dispatch}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

export default function SimonGame() {
  const game = useAppSelector((state: RootState) => state.game);
  return <div>Hi</div>
}

//ReactDOM.render(<SimonGame winCount="5" />, document.getElementById("gameControls"));
