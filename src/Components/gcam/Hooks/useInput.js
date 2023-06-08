import React from 'react'
const useInput = () => {
    const [name , setName] = useState('')
    const [list , setList] = useState([]) 

  return (
    <div>    
    <input
    type="text"
    value={processorName}
    className="w-72 h-12 rounded-lg text-lg text-black"
    onChange={(e) => setName(e.target.value)}
  />
  <button className="bg-blue-600 p-3 rounded-lg m-3"     onClick={(e) => {
    setList(
      [...list, name],
      setName("")
    );
  }} />
  </div>
  )
}

export default useInput