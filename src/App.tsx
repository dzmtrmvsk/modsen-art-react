import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BurgerMenuContextProvider } from '@/contexts/BurgerMenuContext'
import { ROUTE_CONFIG } from './routes'

const App = () => {
  return (
    <BurgerMenuContextProvider>
      <BrowserRouter>
        <Routes>
          {Object.values(ROUTE_CONFIG).map((route) => (
            <Route key={route.path} path={route.generatePath()} Component={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </BurgerMenuContextProvider>
  )
}

export default App
