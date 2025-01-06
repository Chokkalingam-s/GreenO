import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './components/auth/signin/AuthContext'
import { RoleProvider } from './components/auth/RoleContext'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <AuthProvider>
    <RoleProvider>
      <App />
    </RoleProvider>
  </AuthProvider>
)
