import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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
        기본 Eruda 플로팅 버튼을 그대로 사용하고, 색상만 가볍게 커스텀한 버전입니다.
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
    </main>
  )
}

export default App
