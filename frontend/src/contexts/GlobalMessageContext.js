import { useContext, createContext, useState, useEffect } from "react"


const GlobalMessageContext = createContext(null);

export const useGlobalMessageContext = () => {
    return useContext(GlobalMessageContext)
}

export default function GlobalMessageProvider({ children }) {
    const [globalMessage, setGlobalMessage] = useState(null)

    useEffect(() => {
        if (globalMessage) {
            setTimeout(() => {
                setGlobalMessage(null)
            }, 3000);
        }
    }, [globalMessage])

  return (
    <GlobalMessageContext.Provider value={{globalMessage, setGlobalMessage}}>
        {children}
    </GlobalMessageContext.Provider>
  )
}
