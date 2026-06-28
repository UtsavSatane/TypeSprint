function ResultScreen({ result, onRestart, onHome }) {
  if (!result) return null

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      fontFamily: "Inter, sans-serif"
    }}>
      <div style={{
        background: "#1a1a24",
        border: "1px solid #2a2a3a",
        borderRadius: "16px",
        padding: "48px",
        textAlign: "center",
        maxWidth: "480px",
        width: "100%"
      }}>
        <div style={{ fontSize: "48px", marginBottom: "8px" }}>🏁</div>
        <h2 style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "28px",
          color: "#f0f0ff",
          marginBottom: "32px"
        }}>Race Complete</h2>

        {/* Scores */}
        <div style={{ display: "flex", justifyContent: "center", gap: "32px", marginBottom: "40px" }}>
          <div>
            <div style={{ fontSize: "48px", fontWeight: "700", color: "#6c63ff", fontFamily: "JetBrains Mono, monospace" }}>
              {result.wpm}
            </div>
            <div style={{ color: "#6b6b8a", fontSize: "13px", marginTop: "4px" }}>WPM</div>
          </div>
          <div style={{ width: "1px", background: "#2a2a3a" }} />
          <div>
            <div style={{ fontSize: "48px", fontWeight: "700", color: "#00d4aa", fontFamily: "JetBrains Mono, monospace" }}>
              {result.accuracy}%
            </div>
            <div style={{ color: "#6b6b8a", fontSize: "13px", marginTop: "4px" }}>ACCURACY</div>
          </div>
          <div style={{ width: "1px", background: "#2a2a3a" }} />
          <div>
            <div style={{ fontSize: "48px", fontWeight: "700", color: "#f0f0ff", fontFamily: "JetBrains Mono, monospace" }}>
              {result.time}s
            </div>
            <div style={{ color: "#6b6b8a", fontSize: "13px", marginTop: "4px" }}>TIME</div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <button
            onClick={onRestart}
            style={{
              padding: "12px 32px",
              borderRadius: "10px",
              border: "none",
              background: "#6c63ff",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              fontFamily: "JetBrains Mono, monospace"
            }}
          >
            Try Again
          </button>
          <button
            onClick={onHome}
            style={{
              padding: "12px 32px",
              borderRadius: "10px",
              border: "1px solid #2a2a3a",
              background: "transparent",
              color: "#6b6b8a",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              fontFamily: "JetBrains Mono, monospace"
            }}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultScreen