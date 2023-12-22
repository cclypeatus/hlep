import { useState, useEffect } from 'react'
import { parse, stringify } from 'yaml'

import load_data from './loader'
import Node from './components'

import seed from './prog.yaml'


export default function App() {
  const [data, setData] = useState()
  const [keys, setKeys] = useState([])
  const [head, setHead] = useState(null)

  function load(nextData) {
    let [k, v] = load_data(nextData)
    setKeys(k)
    setData(v)
  }
  function alter(path, val, tgtIsKey) {
    // target path
    // change: value
    setData(prev => {
      let tgt = prev;

      for (let step of path) tgt = tgt[step]
      
      if (tgtIsKey) {
        
      } else tgt = val

      return prev
    })
  }

  useEffect(() => load(seed), [])
  console.log(head)

  return (
    <div>
      {keys.map((key) => (
        <Node
          key={key} id={key} val={data[key]}
          alter={alter} setHead={setHead}
        />
      ))}
    </div>
  )
}
