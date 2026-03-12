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
            viewBox="0 0 24 24"
            width="18"
            height="18"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M22.7 19.3l-6.4-6.4c.5-1.4.2-3-1-4.1a4.2 4.2 0 00-4.6-.8l2.4 2.4-2.1 2.1-2.4-2.4c-.8 1.4-.5 3.3.8 4.6 1.1 1.1 2.8 1.5 4.2 1l6.4 6.4a2 2 0 102.8-2.8zM8.2 15.8L4 20l-1.8-1.8 4.2-4.2 1.8 1.8z"
            />
          </svg>
        </button>
      )}
    </main>
  )
}

export default App
