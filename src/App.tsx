import { useEffect } from 'react'
import AppRouter from './routes/AppRouter'
import { getLocalStorage, setLocalStorage } from './utilities'
import { Provider } from 'react-redux'
import store from './redux/store'
import './global.scss'; 
import 'rsuite/dist/rsuite.css'
import { AutoLogout } from './components'




function App() {

  useEffect(() => {
    if(!getLocalStorage('username')) setLocalStorage('username', 'test@hotmail.com')
    if(!getLocalStorage('password')) setLocalStorage('password', 'Abcd$1234')
  }, [])
  

  return (
    <>
    
        <Provider store={store}>
          <AutoLogout>
            <AppRouter/>
          </AutoLogout> 
        </Provider>
    </>
  )
}

export default App
