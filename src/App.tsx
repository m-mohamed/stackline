import { SalesTable } from "./features/sales/SalesTable"
import { ProductDescription } from "./features/product/ProductDescription"
import logo from "./logo.svg"

const Header = () => (
  <header className="bg-blue-900 text-white p-4 shadow-md">
    <div className="container mx-auto flex justify-center items-center">
      <img src={logo} alt="Stackline logo" className="h-8 w-auto" />
    </div>
  </header>
)

const App = () => {
  return (
    <>
      <div className="min-h-screen bg-slate-100 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto my-8 p-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-shadow hover:shadow-xl p-6">
                <ProductDescription />
              </div>
            </div>
            <div className="lg:col-span-3 space-y-8">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <h2 className="text-2xl font-semibold p-6 border-b bg-gray-300">
                  Detailed Sales Data
                </h2>
                <SalesTable />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default App
