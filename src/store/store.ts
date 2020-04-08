import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducer/reducer'
import { composeWithDevTools } from 'redux-devtools-extension';


const loggerMiddleware = createLogger()

export default function configureStore(preloadedState: any) {
    return createStore(
      rootReducer,
      composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware))
    )
  }