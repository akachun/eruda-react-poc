import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [isErudaOpen, setIsErudaOpen] = useState(false)
  const [fabPos, setFabPos] = useState(() => ({
    x: Math.max(12, (window.innerWidth || 390) - 56),
    y: Math.max(12, (window.innerHeight || 844) - 56),
  }))

  const dragRef = useRef({ dragging: false, moved: false, offsetX: 0, offsetY: 0 })
  const ignoreClickRef = useRef(false)

  useEffect(() => {
    if (!window.__ERUDA_ENABLED__ || !window.__ERUDA__) return

    const entryBtn = window.__ERUDA__.get('entryBtn')
    entryBtn?.hide()
  }, [])

  const clampFab = (x, y) => {
    const btnWidth = 44
    const btnHeight = 44
    const maxX = Math.max(12, window.innerWidth - btnWidth - 12)
    const maxY = Math.max(12, window.innerHeight - btnHeight - 12)
    return {
      x: Math.min(maxX, Math.max(12, x)),
      y: Math.min(maxY, Math.max(12, y)),
    }
  }

  const onFabPointerDown = (e) => {
    const target = e.currentTarget
    const rect = target.getBoundingClientRect()

    dragRef.current.dragging = true
    dragRef.current.moved = false
    dragRef.current.offsetX = e.clientX - rect.left
    dragRef.current.offsetY = e.clientY - rect.top

    target.setPointerCapture?.(e.pointerId)
  }

  const onFabPointerMove = (e) => {
    if (!dragRef.current.dragging) return

    const nextX = e.clientX - dragRef.current.offsetX
    const nextY = e.clientY - dragRef.current.offsetY

    const clamped = clampFab(nextX, nextY)
    setFabPos(clamped)
    dragRef.current.moved = true
  }

  const onFabPointerUp = (e) => {
    if (dragRef.current.moved) {
      ignoreClickRef.current = true
      setTimeout(() => {
        ignoreClickRef.current = false
      }, 0)
    }

    dragRef.current.dragging = false
    dragRef.current.moved = false
    e.currentTarget.releasePointerCapture?.(e.pointerId)
  }

  const toggleEruda = () => {
    if (ignoreClickRef.current) return
    if (!window.__ERUDA_ENABLED__ || !window.__ERUDA__) return

    if (isErudaOpen) {
      window.__ERUDA__.hide()
      setIsErudaOpen(false)
    } else {
      window.__ERUDA__.show()
      setIsErudaOpen(true)
    }
  }

  const testConsole = () => {
    console.log('✅ console log test from button click')
    console.warn('⚠️ warning test')
    console.error('❌ error test')
  }

  const testNetwork = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const data = await res.json()
    console.log('🌐 network response:', data)
  }

  return (
    <main style={{ maxWidth: 680, margin: '0 auto', padding: 24, textAlign: 'left' }}>
      <h1>React + Eruda Mobile Debug POC</h1>
      <p>
        Shadow DOM은 유지하고, 대신 커스텀 파란 버튼으로 Eruda를 토글합니다.
        <br />
        PC에서는 URL 뒤에 <code>?debug=1</code>을 붙이면 강제로 열 수 있어요.
      </p>

      <div className="card">
        <button onClick={() => setCount((c) => c + 1)}>count is {count}</button>
        <button onClick={testConsole} style={{ marginLeft: 8 }}>콘솔 테스트</button>
        <button onClick={testNetwork} style={{ marginLeft: 8 }}>네트워크 테스트</button>
      </div>

      <ul>
        <li>Eruda Console 탭에서 로그/에러 확인</li>
        <li>Network 탭에서 fetch 요청 확인</li>
        <li>Elements 탭에서 DOM/CSS 확인</li>
      </ul>

      {window.__ERUDA_ENABLED__ && (
        <button
          className={`debug-fab ${isErudaOpen ? 'is-open' : ''}`}
          style={{ left: `${fabPos.x}px`, top: `${fabPos.y}px` }}
          onPointerDown={onFabPointerDown}
          onPointerMove={onFabPointerMove}
          onPointerUp={onFabPointerUp}
          onClick={toggleEruda}
          aria-label={isErudaOpen ? '디버그 닫기' : '디버그 열기'}
          title={isErudaOpen ? '디버그 닫기' : '디버그 열기'}
        >
          <svg
            className="debug-fab-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 120 120"
            width="26"
            height="26"
            aria-hidden="true"
          >
            <defs>
              <mask id="wrench-mask">
                <rect width="120" height="120" fill="white" />
                <g transform="rotate(45 60 60)">
                  <circle cx="60" cy="90" r="4.5" fill="black" />
                  <circle cx="60" cy="20" r="9" fill="black" />
                  <rect x="51" y="0" width="18" height="20" fill="black" />
                </g>
              </mask>

              <mask id="hammer-mask">
                <rect width="120" height="120" fill="white" />
                <g transform="rotate(-45 60 60)">
                  <circle cx="60" cy="90" r="4.5" fill="black" />
                  <circle cx="28" cy="24" r="10" fill="black" />
                </g>
                <g transform="rotate(45 60 60)">
                  <rect x="46" y="45" width="28" height="30" fill="black" />
                </g>
              </mask>
            </defs>

            <g fill="currentColor" mask="url(#wrench-mask)">
              <g transform="rotate(45 60 60)">
                <rect x="52" y="25" width="16" height="75" rx="8" />
                <circle cx="60" cy="20" r="16" />
              </g>
            </g>

            <g fill="currentColor" mask="url(#hammer-mask)">
              <g transform="rotate(-45 60 60)">
                <rect x="52" y="25" width="16" height="75" rx="8" />
                <rect x="30" y="14" width="45" height="18" rx="4" />
                <rect x="68" y="12" width="10" height="22" rx="3" />
              </g>
            </g>
          </svg>
        </button>
      )}
    </main>
  )
}

export default App
