import { useState } from "react"
import HomeScreen from "./components/HomeScreen"
import RaceScreen from "./components/RaceScreen"
import ResultScreen from "./components/ResultScreen"

function App() {
  const [screen, setScreen] = useState("home")
  const [mode, setMode] = useState("quote")
  const [result, setResult] = useState(null)

  const goToRace = (selectedMode) => {
    setMode(selectedMode)
    setScreen("race")
  }

  const goToResult = (resultData) => {
    setResult(resultData)
    setScreen("result")
  }

  const goToHome = () => {
    setResult(null)
    setScreen("home")
  }

  return (
    <div>
      {screen === "home" && (
        <HomeScreen onStart={goToRace} />
      )}
      {screen === "race" && (
        <RaceScreen mode={mode} onFinish={goToResult} />
      )}
      {screen === "result" && (
        <ResultScreen result={result} onRestart={() => goToRace(mode)} onHome={goToHome} />
      )}
    </div>
  )
}

export default App