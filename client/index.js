import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'

ReactDOM.render(
    <Provider store={store}>
        < App />
    </Provider>,
    document.getElementById('app')
)




// import { Router } from 'react-router-dom'
// import history from './history'
{/* <Router history={history}> */ }
//  </Router>