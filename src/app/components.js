import { useState } from 'react'

export default function Node({ id, val, alter, head, setHead }) {
  let { title, tags, ...details } = val

  return (
    <div className="bg-gray-900 m-3">
      <div>{id} | {title}</div>
      {/*<div>Tags: {(tags || ).join(', ')}</div>*/}
      <hr />
      <Level details={details}
        path={[id]} alter={alter} setHead={setHead}
        // head={head && head[0] == id ? head.slice(1) : false}
      />
    </div>
  )
}

// renders property with value of an arbitrary data type
function Level({ details, path, alter, head, setHead }) {
  // ui components
  const branch = ([key, val]) => {
    let isArr = Number.isInteger(key)
    return (
    <li key={key} className={isArr ? 'list-["-"] pl-1' : ''}>
      {!isArr && <span><code>{key}</code>: </span> }
      <Level details={val}
        path={[...path, key]} alter={alter} setHead={setHead}
        // head={head && head[0] == key ? head.slice(1) : false}
      />
    </li>
  )},
  Leaf = ({ children }) => {
    const [value, setValue] = useState(children)
    const [editing, edit] = useState(false)

    // console.log(editing)

    const wrapAlter = e => {
      let { key, shiftKey } = e
      if (key) {
        if (key != 'Enter' || shiftKey) return
      }
      e.preventDefault()

      alter(path, value)
      edit(false)
    }
    return (
      <>
      {
      editing ? (
        <textarea defaultValue={value}
          rows={value.split('\n').length} cols='50' className='text-inherit bg-neutral-800 text-[0.9rem]'
          onChange={({target}) => setValue(target.value)}
          onKeyDown={wrapAlter}
        />
        ) : (
        <span
          className="inline-block min-w-[100px] hover:bg-gray-700 "
          onClick={() => { 
            setHead([])
            edit(true) 
          }}
        >
          {value}
        </span>)
      }
      {
        <button
          onClick={
            editing ? wrapAlter :
            () => edit(true)
          }
          className="float-right relative right-5"
        >
          {editing ? 'Enter' : 'Edit'}
        </button>
        // buttons
      }
      </>
  )}
  
  return typeof details == 'object' && details ? (
  <ul className="ml-5">
    {
      details.length > -1 ? 
      details.map((el, i) => branch([i, el])) :
      Object.entries(details).map(branch)
    }
  </ul>
  ) : (
  <Leaf>
    {
      (!details || ['string', 'boolean', 'number'].includes(typeof details)) ?
      `${details}` : typeof details     
    }
  </Leaf>
  )
}
