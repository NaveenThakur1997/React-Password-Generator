import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setnumberAllowed]= useState(false)
  const [charAllowed, setcharAllowed]= useState(false)
  const [Password, setpassword]= useState("")
  // Use ref hook
  const passwordref = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    if (numberAllowed) str += "123456789";
    if (charAllowed) str += "!@#$%^&*()+";
  
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
  
    setpassword(pass);
  }, [length, numberAllowed, charAllowed, setpassword]);

  const copyPasswordtoClipBoard = useCallback(()=>{
    passwordref.current?.select()
    window.navigator.clipboard.writeText(Password)
  }, [Password])

  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <div className='w-1/3 h-50  items-center mx-auto rounded-lg px-4 m-8 text-orange-500 bg-gray-600  p-4 ' ><h1 className='text-center text-xl my-3' >Password Generator by Naveen</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4' >
      <input type="text"
      value={Password}
      className='outline-none w-full py-1 px-3'
      placeholder='password'
      readOnly
      ref={passwordref}
      /> 

      <button
      onClick={copyPasswordtoClipBoard}
      className='w-22 p-3 font-bold active:bg-slate-500' >Copy</button>
    </div>
    <div className='flex text-sm gap-x-2' >
      <div className='flex items-center gap-x-1' >
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{setlength(e.target.value)}}
        />
        <label>Length: {length}</label>
      </div>
      <div className='flex items-center gap-x-1' >
        <input 
        type="checkbox"
        defaultChecked = {numberAllowed}
        id= "numberInput"
        onChange={()=>{
          setnumberAllowed((prev)=> !prev)
        }}
        />
        <label htmlFor='numberInput' >Numbers</label>
      </div>
      <div className='flex items-center gap-x-1' >
        <input 
        type="checkbox"
        defaultChecked = {charAllowed}
        id="characterInput"
        onChange={()=>{
          setcharAllowed((prev)=> !prev)
        }
 }      
        />
        <label htmlFor='CharacterInput' >Characters</label>
      </div>
    </div>
    </div>
  )
}

export default App
