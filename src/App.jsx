import ToDoList from "./component/ToDoList";
import useStorage from "./hooks/useStorage";
import "./App.css"

const App = () => {
  const [theme, setTheme] = useStorage("theme", "light")

  return (
    <>
    <div className={theme}>
      <h2>Pagina esercizi</h2>

      <button className="btn-theme" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>Cambia tema</button>

      <ToDoList />
    </div>
    </>
  )
}

export default App