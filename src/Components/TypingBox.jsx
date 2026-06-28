import { useRef, useEffect } from "react"

function TypingBox({ text, typed, charStates, onInput }) {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        background: "#1a1a24",
        border: "1px solid #2a2a3a",
        borderRadius: "12px",
        padding: "32px",
        cursor: "text",
        marginBottom: "24px",
        position: "relative",
        width: "100%"
      }}
    >
      <div style={{
        fontFamily: "JetBrains Mono, monospace",
        fontSize: "22px",
        lineHeight: "1.8",
        letterSpacing: "0.5px",
        userSelect: "none"
      }}>
        {text.split("").map((char, i) => {
          const state = charStates[i]
          const isCursor = i === typed.length

          let color = "#6b6b8a"
          if (state === "correct") color = "#f0f0ff"
          if (state === "incorrect") color = "#ff4d6d"

          return (
            <span
              key={i}
              style={{
                color,
                borderBottom: isCursor ? "2px solid #6c63ff" : "2px solid transparent",
                transition: "color 0.1s"
              }}
            >
              {char}
            </span>
          )
        })}
      </div>

      {/* Add autocomplete/autocorrect off */}
      <input
        ref={inputRef}
        value={typed}
        onChange={e => onInput(e.target.value)}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        style={{
          position: "absolute",
          opacity: 0,
          top: 0, left: 0,
          width: "100%", height: "100%",
          cursor: "text"
        }}
      />
    </div>
  )
}

export default TypingBox