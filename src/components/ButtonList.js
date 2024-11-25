import React from 'react'
import Button from './Button'

const suggestions = ["All", "Thrillers", "Music", "Mixes", "Sitcoms", "News", "Gaming", "Songs", "Cricket", "Cooking", "Live", "Soccer"]

const ButtonList = () => {
  return (
    <div className='flex'>
      {
        suggestions.map((suggestion) => <Button name={suggestion}/>)
      }
    </div>
  )
}

export default ButtonList