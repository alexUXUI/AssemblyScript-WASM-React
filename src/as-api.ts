import { instantiateStreaming, ImportsObject } from 'assemblyscript/lib/loader'

interface API {
  add(a: number, b: number): number
}

const imports: ImportsObject = {}

export default instantiateStreaming<API>(fetch('./as-api.wasm'), imports)
