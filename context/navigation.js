import { createContext} from 'react'

const navigationContext = createContext()
const { Provider, Consumer} = navigationContext

export {
  navigationContext,
  Provider,     
  Consumer
}

