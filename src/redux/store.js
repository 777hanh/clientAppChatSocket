import { createStore } from "redux";
// import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducer'
// import { loadState, saveState } from './loadStore'

const loadState = () => {
    try { // It's also possible to use other local storage if it doesn't support localStorage
        const serializedState = localStorage.getItem('state');
        const tokenAccess = localStorage.getItem('e-laptop')
        if (tokenAccess === null)
            return undefined;
        else if (serializedState === null) {
            return undefined;
        } else {
            return JSON.parse(serializedState);
        }
    } catch (err) {
        // ...error handling
        return undefined;
    }
}

const peristedState = loadState()
// const composeEnhancers = composeWithDevTools()

// const store = createStore(rootReducer, peristedState, composeEnhancers)
const store = createStore(rootReducer, peristedState)

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        // ...error handling
    }
};

store.subscribe(() => {
    const state = store.getState();
    saveState(state);
})

export default store