import { useCallback, useEffect, useState , useRef } from 'react'

import './App.css'

function App() {
  const [length , setLength]  = useState(8)
  const[numberAllowed , setNumberAllowed] = useState(false)
  const[charAllowed , setcharAllowed] = useState(false)
  const[password , setPassword] = useState('')


  // useRef Hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback (() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*(){}`<>"

    for (let i = 1; i <=length; i++) {
     let strIndex = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(strIndex)
    }
    setPassword(pass)
  } , [length , numberAllowed , charAllowed])

  useEffect(() => {
    passwordGenerator()
  } , [length , numberAllowed , charAllowed , setPassword])

    const copyPasswordToClipboard = useCallback (() => {
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0,10)
      window.navigator.clipboard.writeText(password)
    } , [password])

  return (
    <>
   <div className='w-full max-w-xl mx-auto shadow-md rounded-lg px-4 py-4  my-8 text-orange-500 bg-gray-700'> 
   <h1 className='text-white text-center text-2xl my-4'> Password Generator</h1>

    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input className='outline-none w-full py-2 px-4'
       type="text"
       value={password}
       placeholder='password'
       readOnly
       ref={passwordRef}
       />
       <button
       onClick={copyPasswordToClipboard}
       className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
    </div>
    <div className='flex -text-sm gap-x-2 '>
      <div className='flex items-center gap-x-1 mx-2'>
        <input  className='cursor-pointer'
        onChange={(e) => {setLength(e.target.value)}}
        type="range"
        min={8}
        max={99}
        value={length}
         />
         <label> Length: {length}</label>
      </div>
      <div className='flex items-center gap-x-2 mx-3'>
        <input 
        type="checkbox" 
        defaultChecked= {numberAllowed}
        id='numberInput'
        onChange={() => {
          setNumberAllowed((prev) => !prev)
        }}
        />
        <label>Numbers</label>
      </div>
      <div className='flex items-center gap-x-2 mx-3'>
        <input 
        type="checkbox" 
        defaultChecked= {charAllowed}
        id='charInput'
        onChange={() => {
          setcharAllowed((prev) => !prev)
        }}
        />
        <label>Characters</label>
      </div>
    </div>
   </div>

    </>
  )
}

export default App
