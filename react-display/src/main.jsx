import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

const API_URL = '/api/greetings'

function App() {
  const [greetings, setGreetings] = useState([])
  const [status, setStatus] = useState('Загружаем сообщения...')

  async function loadGreetings() {
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`)
      setGreetings(await response.json())
      setStatus('')
    } catch (error) {
      setStatus(`Не удалось загрузить сообщения. ${error.message}`)
    }
  }

  useEffect(() => {
    loadGreetings()
  }, [])

  return (
    <main className="container">
      <div className="heading">
        <h1>Сообщения</h1>
        <button onClick={loadGreetings}>Обновить</button>
      </div>
      <p>Список загружается из Spring Boot.</p>
      {status && <p role="status">{status}</p>}
      {!status && greetings.length === 0 && <p>Пока сообщений нет.</p>}
      <ul>
        {greetings.map((greeting) => (
          <li key={greeting.id}>
            <strong>{greeting.name}</strong>
            <span>{greeting.message}</span>
          </li>
        ))}
      </ul>
    </main>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
