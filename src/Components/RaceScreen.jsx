import { useRef, useState, useEffect, useCallback } from "react"
import TypingBox from "./TypingBox"
import StatsBar from "./StatsBar"
import useTimer from "../hooks/useTimer"
import quotes from "../data/quotes"
import words from "../data/words"
import codeSnippets from "../data/codeSnippets"

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function RaceScreen({ mode, onFinish }) {
  // useRef never triggers re-render — text is locked forever
  const textRef = useRef("")
  if (textRef.current === "") {
    if (mode === "words") textRef.current = getRandom(words)
    else if (mode === "code") textRef.current = getRandom(codeSnippets)
    else textRef.current = getRandom(quotes)
  }
  const text = textRef.current

  const [typed, setTyped] = useState("")
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const timer = useTimer()

  // Recalculate WPM
  useEffect(() => {
    if (timer.time > 0 && typed.length > 0) {
      const correctChars = typed.split("").filter((ch, i) => ch === text[i]).length
      const minutes = timer.time / 60
      setWpm(Math.round((correctChars / 5) / minutes))
    }
  }, [timer.time])

  // Recalculate accuracy
  useEffect(() => {
    if (typed.length === 0) { setAccuracy(100); return }
    const correct = typed.split("").filter((ch, i) => ch === text[i]).length
    setAccuracy(Math.round((correct / typed.length) * 100))
  }, [typed])

  // Check finish
  useEffect(() => {
    if (typed.length > 0 && typed === text) {
      timer.stop()
      onFinish({ wpm, accuracy, time: timer.time })
    }
  }, [typed])

  const handleInput = useCallback((value) => {
    // Start timer on first character
    if (typed.length === 0 && value.length === 1) {
      timer.start()
    }
    setTyped(value)
  }, [typed])

  const charStates = text.split("").map((char, i) => {
    if (i >= typed.length) return "idle"
    return typed[i] === char ? "correct" : "incorrect"
  })

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      maxWidth: "860px",
      margin: "0 auto"
    }}>
      <h2 style={{
        fontFamily: "JetBrains Mono, monospace",
        color: "#6b6b8a",
        fontSize: "14px",
        letterSpacing: "2px",
        textTransform: "uppercase",
        marginBottom: "32px"
      }}>
        {mode} mode
      </h2>

      <StatsBar wpm={wpm} accuracy={accuracy} time={timer.time} />

      <TypingBox
        text={text}
        typed={typed}
        charStates={charStates}
        onInput={handleInput}
      />

      <p style={{ color: "#6b6b8a", fontSize: "13px" }}>
        Click the box and start typing — timer starts automatically
      </p>
    </div>
  )
}

export default RaceScreen