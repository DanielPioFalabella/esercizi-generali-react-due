import Modal from "./component/Modal"
import { useState } from "react"
import ToDoList from "./component/ToDoList";

const App = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <h2>Pagina esercizi</h2>
      <button className="btn-modal" onClick={() => setShow(true)}>Apri Modale</button><br/>
      <Modal
        title="modale"
        content="contenuto modale"
        show={show}
        onClose={() => setShow(false)} />

      <ToDoList />
    </>
  )
}

export default App