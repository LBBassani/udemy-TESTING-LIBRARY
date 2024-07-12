import "./App.css";
import { useState } from "react";
import { kebabCaseToTitleCase } from "./helpers";

function App() {
  const [buttonColor, setButtonColor] = useState("medium-violet-red");
  const newButtonColor = buttonColor === "medium-violet-red" ? "midnight-blue" : "medium-violet-red";

  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="app-div">
      <button disabled={isChecked} className={isChecked? "gray" : buttonColor} onClick={() => {
        setButtonColor(newButtonColor);
      }}>Change to {kebabCaseToTitleCase( newButtonColor )}</button>
      <span>
      <input type="checkbox" id="disable-button-checkbox" defaultChecked={isChecked} onClick={() => {setIsChecked(!isChecked)}}></input>
      <label htmlFor="disable-button-checkbox">Disable Button</label>
      </span>
    </div>
  );
}

export default App;
