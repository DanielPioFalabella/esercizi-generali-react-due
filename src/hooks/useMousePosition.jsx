import { useEffect, useState } from "react"

function useMousePosition() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const position = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener("mousemove", position)

        return () => {
            window.removeEventListener("mousemove", position)
        }
    }, [])

    return mousePosition
}

export default useMousePosition