import { useState } from "react"

function useStorage (key, initialValue){
    const [state, setState] = useState(() => {
        const prevState = localStorage.getItem(key)
        if(prevState) {
            return prevState
        } else {
            localStorage.setItem(key, initialValue);
            return initialValue
        }
    })

    const changeState = (newState) => {
        setState(newState);
        localStorage.setItem(key, newState)
    }

    return [state, changeState]
}

export default useStorage