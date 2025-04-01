import { useState } from "react";


export default function usePersistedState(stateKey, initialState) {
    const [state, setState] = useState (() => { 
        const persistedState = localStorage.getItem(stateKey);

        try {
            const persistedState = localStorage.getItem(stateKey);

            if (!persistedState) { 
                return typeof initialState === "function"
                    ? initialState()
                    : initialState;
            }

            return JSON.parse(persistedState);


        } catch (error) {
            console.error(`Error parsing ${stateKey} from localStorage:`, error);
            localStorage.removeItem(stateKey);
            return typeof initialState === "function"
                ? initialState()
                : initialState;
        }

    });

    const setPersistedState = (input) => { 
        const data = typeof input === "function"
            ? input(state)
            : input;

        const persistedData = JSON.stringify(data);

        localStorage.setItem(stateKey, persistedData);

        setState(data);
    };

    return [
        state,
        setPersistedState,
    ]
}
