import { useCallback, useEffect, useState } from 'react'
import './App.css'
import './index.css'
// @ts-ignore
import Dice from './components/Dice'

const actions = [
  ['Lick', 'Suck', 'Blow', 'Kiss', 'Touch', 'Show'],
  ['Lick', 'Suck', 'Blow', 'Kiss', 'Touch', 'Show'],
  ['Lick', 'Suck', 'Blow', 'Kiss', 'Touch', 'Show'],
]

const objects = [
  ['Thigh', 'Navel', 'Hand', 'Lips', 'Ears', 'Neck'],
  ['Thigh', 'Navel', 'Hand', 'Lips', 'Ears', 'Neck'],
  ['Thigh', 'Navel', 'Hand', 'Lips', 'Ears', 'Neck'],
]

function App() {
  const [left, setLeft] = useState(Math.floor(Math.random() * 6) + 1)
  const [right, setRight] = useState(Math.floor(Math.random() * 6) + 1)
  const [loveScale, setLoveScale] = useState(0)
  const [darkMode, setDarkMode] = useState(false)

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
    if (storedDarkMode === 'on') {
      setDarkMode(true)
    } else if (storedDarkMode === 'off') {
      setDarkMode(false)
    }
  }, [])

  const roll = useCallback(() => {
    setLeft(Math.floor(Math.random() * 6) + 1)
    setRight(Math.floor(Math.random() * 6) + 1)
  }, [left, right])

  return (
    <div id="playground" className="min-w-screen min-h-screen">
      <section className={darkMode ? 'bg-black' : 'bg-white'}>
        <div className={`pt-1 flex text-xs sm:text-sm ${darkMode ? 'text-gray-600' : 'text-gray-600'}`}>
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
                <Dice values={actions[loveScale]} dieSize={120} faceColor="#f1f1f1" defaultRoll={left} />
              </div>
              <div className="flex-1 flex justify-start">
                <Dice values={objects[loveScale]} dieSize={120} faceColor="#f1f1f1" defaultRoll={right} />
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
      </section>
    </div>
  )
}

export default App
