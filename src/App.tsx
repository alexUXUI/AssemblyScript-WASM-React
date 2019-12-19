import React from 'react'
import API from './as-api'
import './App.css'

function useWASM(
  fetchModule: () => Promise<void | (() => void)>,
  dependencies?: React.DependencyList
) {
  return React.useEffect(() => {
    const unwrapPromise = fetchModule()
    return () => {
      unwrapPromise.then(destructor => destructor && destructor())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}

const App: React.FC = (): JSX.Element => {
  const [sum, setSum] = React.useState<number>(0)
  const [valueA, setValueA] = React.useState<number>(0)
  const [valueB, setValueB] = React.useState<number>(0)

  useWASM(async () => {
    setSum((await API).add(valueA, valueB))
  }, [valueA, valueB])

  return (
    <div className="App">
      <header>
        <h1>WASM React PoC</h1>
        <h4>WASM Calculated Sum: {sum}</h4>
      </header>
      <main>
        <input
          type="number"
          placeholder="Value A"
          onChange={change => {
            setValueA(Number.parseInt(change.target.value))
          }}
        />
        <input
          type="number"
          placeholder="Value B"
          onChange={change => {
            setValueB(Number.parseInt(change.target.value))
          }}
        />
      </main>
    </div>
  )
}

export default App
