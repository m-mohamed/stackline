import { SalesTable } from "./features/sales/SalesTable"
import { ProductDescription } from "./features/product/ProductDescription"
import logo from "./logo.svg"

const App = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-slate-400">
        <header className="w-full flex justify-center">
          <img src={logo} alt="logo" className="h-40 w-auto" />
        </header>
        <main className="w-full max-w-4xl mt-8 flex flex-col items-center">
          <ProductDescription />
          <div className="mt-8 w-full">
            <SalesTable />
          </div>
        </main>
      </div>
    </>
  )
}

export default App
