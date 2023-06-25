import { useState } from "react"
function  useInput() {
    const [name , setName] = useState('')
    const [list , setList] = useState([]) 
    function changeName(e){
        setName(e.target.value)
        // setName(name.trim())
    }
    function changeList(e){
        setList([...list , name])
    }
    return [name , list , changeName , changeList]
}

export default useInput