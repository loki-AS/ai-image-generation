import React, { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'

const App = () => {

  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(true)

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async() => {
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
  });

  setLoading(false)

  setResult(res.data.data[0].url)
}
  return (
    <div className='h-screen container flex flex-col justify-center items-center'>
      <h1 className='text-lg text-gray-500 font-medium'>Generate an Image using Open AI API</h1>
      <input 
      type="text" 
      placeholder='enter the image name..' 
      onChange={e => setPrompt(e.target.value)}  
      className="border px-4 py-2 rounded-md my-4"
      />
      <button onClick={generateImage} className="px-4 py-2 bg-rose-500 text-white uppercase font-serif rounded-md">Generate</button>
      <div className='mt-6'>
        {
          !loading ? (
            <img src={result} alt={result} className="h-96 w-96" />
          ): (
            <h1>
            
            </h1>
          )
        }
      </div>
    </div>
  )
}

export default App