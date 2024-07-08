import { Quotes } from "./features/quotes/Quotes"
import logo from "./logo.svg"

const App = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-slate-400">
        <header className="w-full flex justify-center">
          <img src={logo} alt="logo" className="h-40 w-auto" />
        </header>
      </div>
    </>
  )
}

export default App
