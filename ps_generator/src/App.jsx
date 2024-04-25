import { useCallback, useEffect, useState, useRef } from "react"

function App() {

  const [length,setLength] = useState(8);
  const [isNumber,setIsNumber] = useState(false);
  const [isChar,setIsChar] = useState(false);
  const [password,setPassword] = useState("");
  const passwordRef = useRef(null);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(isNumber) str += "0123456789"
    if(isChar) str += "~!@#$%^&*()_-+={[}]|\:;<>?/"

    for(let i = 1; i<= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass);

  }, [length, isNumber, isChar, setPassword]);

  useEffect(() => {
    passwordGenerator();
  },[length,isNumber,isChar,passwordGenerator]);

  return (
    <>

      <div className="container h-screen w-full bg-transparent flex justify-center items-center">
        <div className="main h-[250px] w-[700px] bg-red-80 border-[1px] border-solid border-white">
          <div className="title h-[30%] w-full bg-green-80 flex justify-center items-center border-b-[1px] border-solid border-white">
            <h1 className="text-white text-[30px]">Password generator</h1>
          </div>
          <div className="box h-[70%] w-full bg-blue-80">
              <div className="password h-[50%] w-full bg-green-80 flex justify-center items-end">
                <input 
                type="text"
                value={password}
                className="bg-red-90 text-white h-[40px] w-[50%] border-[1px] bg-transparent border-solid border-white px-[10px] py-[5px] outline-none"
                placeholder="password"
                readOnly
                ref={passwordRef}
                />
                <button
                  onClick={copyPassword}
                  className="h-[40px] w-[10%] border-[1px] border-solid border-white text-white hover:bg-white hover:text-black">Copy</button>
              </div>
              <div className="btns h-[50%] w-full bg-red-80 flex justify-center items-center">
                <div className="range w-[50%] h-full bg-green-70 flex justify-center items-center gap-[20px]">
                  <input 
                  type="range"
                  min={6}
                  max={100}
                  value={length}
                  className="cursor-pointer"
                  color="white"
                  onChange={(e) => {setLength(e.target.value)}}
                  />
                  <label htmlFor="" className="text-white">Length: {length}</label>
                </div>
                <div className="nums w-[25%] h-full flex justify-center items-center gap-[20px] ">
                    <input 
                      type="checkbox"
                      defaultChecked={isNumber}
                      id="numberInput"
                      onChange={() => {
                        setIsNumber((prev) => !prev);
                      }}
                    />
                  <label htmlFor="numberInput" className="text-white">Numbers</label>
                </div>
                <div className="nums w-[25%] h-full flex justify-center items-center gap-[20px] ">
                    <input 
                      type="checkbox"
                      defaultChecked={isChar}
                      id="charInput"
                      onChange={() => {
                        setIsChar((prev) => !prev);
                      }}
                    />
                  <label htmlFor="charInput" className="text-white">Characters</label>
                </div>
              </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
