import { useCallback, useEffect, useState } from "react";
import "./App.css";
import "./index.css";
// @ts-ignore
import Dice from "./components/Dice";

function App() {
  const [left, setLeft] = useState(Math.floor(Math.random() * 6) + 1);
  const [right, setRight] = useState(Math.floor(Math.random() * 6) + 1);
  const [darkMode, setDarkMode] = useState(false);

  const turnOnDarkMode = useCallback(() => {
    localStorage.setItem("dice_app_dark_mode", "on");
    setDarkMode(true);
  }, [darkMode]);

  const turnOffDarkMode = useCallback(() => {
    localStorage.setItem("dice_app_dark_mode", "off");
    setDarkMode(false);
  }, [darkMode]);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("dice_app_dark_mode");
    if (storedDarkMode === "on") {
      setDarkMode(true);
    } else if (storedDarkMode === "off") {
      setDarkMode(false);
    }
  }, []);

  const roll = useCallback(() => {
    setLeft(Math.floor(Math.random() * 6) + 1);
    setRight(Math.floor(Math.random() * 6) + 1);

    const elem = document.getElementById("playground");
    if (!elem) {
      return;
    }
    const fullScreenElem = elem as HTMLElement & {
      mozRequestFullScreen(): Promise<void>;
      webkitRequestFullscreen(): Promise<void>;
      msRequestFullscreen(): Promise<void>;
    };
    if (fullScreenElem.requestFullscreen) {
      fullScreenElem.requestFullscreen();
    } else if (fullScreenElem.mozRequestFullScreen) {
      fullScreenElem.mozRequestFullScreen();
    } else if (fullScreenElem.webkitRequestFullscreen) {
      fullScreenElem.webkitRequestFullscreen();
    } else if (fullScreenElem.msRequestFullscreen) {
      fullScreenElem.msRequestFullscreen();
    }
  }, [left, right]);

  return (
    <div id="playground" className="min-w-screen min-h-screen">
      <section className={darkMode ? "bg-black" : "bg-white"}>
        <div
          className={`p-1 flex ${
            darkMode ? "text-yellow-300" : "text-gray-600"
          }`}
        >
          <span
            className="text-sm font-semibold px-2"
            onClick={darkMode ? turnOffDarkMode : turnOnDarkMode}
          >
            {darkMode ? "Light mode" : "Dark mode"}
            {" | "}
          </span>
          <span
            className="text-sm font-semibold px-2"
            onClick={() => {
              setDarkMode(!darkMode);
            }}
          >
            follow me:{" "}
            <a href="https://instagram.com/hsblhsn" target="_blank">
              @hsblhsn
            </a>
          </span>
        </div>
        <div className="flex h-screen w-screen bg-inherit">
          <div className="m-auto">
            <div className="flex justify-center">
              <button
                onClick={roll}
                className="bg-red-700 hover:bg-red-700 focus:outline-2 focus:outline-double focus:outline-red-900 text-white font-bold px-4 py-2 rounded-3xl rotate-180"
              >
                Roll Your Valentine
              </button>
            </div>
            <div className="flex py-16">
              <div className="flex-1 flex justify-end">
                <Dice
                  values={["Lick", "Suck", "Blow", "Kiss", "Touch", "Show"]}
                  dieSize={120}
                  faceColor="#f1f1f1"
                  defaultRoll={left}
                />
              </div>
              <div className="flex-1 flex justify-start">
                <Dice
                  values={["Thigh", "Navel", "Hand", "Lips", "Ears", "Neck"]}
                  dieSize={120}
                  faceColor="#f1f1f1"
                  defaultRoll={right}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={roll}
                className="bg-red-700 hover:bg-red-700 focus:outline-2 focus:outline-double focus:outline-red-900 text-white font-bold px-4 py-2 rounded-3xl"
              >
                Roll Your Valentine
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
