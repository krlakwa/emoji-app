import * as React from 'react'

import Input from './components/Input'
import { getMatchingEmojis } from './utlis/getMatchingEmojis'
import './App.css'

function App() {
  const [search, setSearch] = React.useState('')
  const [emojisData, setEmojisData] = React.useState(null)

  React.useEffect(() => {
    const fetchData = () =>
      fetch('data.json', {
        headers: new Headers({ 'content-type': 'application/json' }),
      })
        .then((response) => response.json())
        .then((data) => setEmojisData(data))
        .catch((error) => console.log('ERROR', error))

    fetchData()
  }, [])

  const matchingEmojis = React.useMemo(() => {
    if (search.length < 2 || !emojisData) {
      return []
    }

    return getMatchingEmojis(search, emojisData)
  }, [search, emojisData])

  function handleSetSearch(e) {
    setSearch(e.target.value)
  }

  return (
    <div className="App">
      <Input onChange={handleSetSearch} />
      <div className="List">
        {matchingEmojis?.map((item) => (
          <div className="Card" key={item.emoji}>
            {item.emoji}
            <p className="Card__text">Code: {item.unicode}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
