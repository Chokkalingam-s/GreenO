import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './components/auth/signin/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <AuthProvider>
      <App />
  </AuthProvider>
)
