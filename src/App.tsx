import { useCallback, useEffect, useState } from 'react'
import './App.css'
import './index.css'
// @ts-ignore
import Dice from './components/Dice'

function App() {
  const [actionData] = useState([
    ['Hold', 'Press', 'Touch', 'Kiss', 'Touch', 'Show'],
    ['Lick', 'Suck', 'Blow', 'Kiss', 'Touch', 'Show'],
    ['Lick', 'Suck', 'Blow', 'Kiss', 'Touch', 'Grab'],
  ])
  const [objectData] = useState([
    ['Thigh', 'Navel', 'Hands', 'Lips', 'Ears', 'Neck'],
    ['Thigh', 'Navel', 'Hands', 'Lips', 'Legs', 'Neck'],
    ['Chest', 'Boobs', 'Belly', 'Ass', '***', '***'],
  ])
  const [left, setLeft] = useState(Math.floor(Math.random() * 6) + 1)
  const [right, setRight] = useState(Math.floor(Math.random() * 6) + 1)
  const [intensityLevel, setIntensityLevel] = useState(0)
  const [darkMode, setDarkMode] = useState(false)
  const [actions, setActions] = useState(actionData[intensityLevel])
  const [objects, setObjects] = useState(objectData[intensityLevel])
  const setIntensity = useCallback(
    (val: number) => {
      setActions(actionData[val])
      setObjects(objectData[val])
      setIntensityLevel(val)
      localStorage.setItem('dice_app_intensity_level', val.toString())
    },
    [actions, objects, intensityLevel]
  )

  const turnOnDarkMode = useCallback(() => {
    localStorage.setItem('dice_app_dark_mode', 'on')
    setDarkMode(true)
  }, [darkMode])

  const turnOffDarkMode = useCallback(() => {
    localStorage.setItem('dice_app_dark_mode', 'off')
    setDarkMode(false)
  }, [darkMode])

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('dice_app_dark_mode')
    const storedIntensity = localStorage.getItem('dice_app_intensity_level')
    if (storedDarkMode === 'on') {
      setDarkMode(true)
    } else if (storedDarkMode === 'off') {
      setDarkMode(false)
    }
    if (storedIntensity) {
      try {
        setIntensityLevel(parseInt(storedIntensity))
      } catch (err) {
        console.error(err)
        setIntensityLevel(0)
      }
    }
  }, [])

  const roll = useCallback(() => {
    setLeft(Math.floor(Math.random() * 6) + 1)
    setRight(Math.floor(Math.random() * 6) + 1)
  }, [left, right])

  return (
    <div id="playground" className="min-w-screen min-h-screen">
      <section className={darkMode ? 'bg-black' : 'bg-white'}>
        <div
          className={`fixed top-0 left-0 pt-1 flex text-xs sm:text-sm ${darkMode ? 'text-gray-600' : 'text-gray-600'}`}
        >
          <span className="font-semibold px-1" onClick={darkMode ? turnOffDarkMode : turnOnDarkMode}>
            {darkMode ? 'Light mode' : 'Dark mode'}
            {' | '}
          </span>
          <span className="font-semibold px-1">
            follow me:{' '}
            <a href="https://instagram.com/hsblhsn" target="_blank" className="underline">
              @hsblhsn
            </a>
            {' | '}
          </span>
          <span className="font-semibold px-1">
            source code:{' '}
            <a href="https://github.com/hsblhsn/valendice" target="_blank" className="underline">
              GitHub
            </a>
            .
          </span>
        </div>
        <div className="flex h-screen w-screen bg-inherit">
          <div className="m-auto">
            <div className="flex justify-center">
              <button
                onClick={roll}
                className="bg-red-700 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-3xl rotate-180 focus:ring-4 focus:ring-red-300"
              >
                Roll Your Valentine
              </button>
            </div>
            <div className="flex py-16">
              <div className="flex-1 flex justify-end">
                <Dice values={actions} dieSize={120} faceColor="#f1f1f1" defaultRoll={left} />
              </div>
              <div className="flex-1 flex justify-start">
                <Dice values={objects} dieSize={120} faceColor="#f1f1f1" defaultRoll={right} />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={roll}
                className="bg-red-700 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-3xl focus:ring-4 focus:ring-red-300"
              >
                Roll Your Valentine
              </button>
            </div>
          </div>
        </div>
        <div
          className={`fixed bottom-0 left-0 pt-1 flex text-xs sm:text-sm ${
            darkMode ? 'text-gray-600' : 'text-gray-600'
          }`}
        >
          <div className="px-2 py-2">
            <span>Intensity:</span>
            <span
              className={`${intensityLevel === 0 ? 'font-bold' : ''} px-2`}
              onClick={() => {
                setIntensity(0)
              }}
            >
              Low
            </span>
            <span
              className={`${intensityLevel === 1 ? 'font-bold' : ''} px-2`}
              onClick={() => {
                setIntensity(1)
              }}
            >
              Medium
            </span>
            <span
              className={`${intensityLevel === 2 ? 'font-bold' : ''} px-2`}
              onClick={() => {
                setIntensity(2)
              }}
            >
              High
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
