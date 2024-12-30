import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './components/signIn/AuthContext'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
)
