import Button from '@components/button'
import { useState } from 'react'
import Circle_Circle from './circle'

const NavBar = () => {
  const [page, setPage] = useState(1)

  const handleNext = () => {
    if (page < 6) {
      setPage(page + 1)
    }
  }
  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const testArrow = () => {
    console.log('test')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="flex w-full items-center justify-around gap-4 bg-stone-600 p-4 px-[5%] text-white md:gap-8">
        <Circle_Circle page={page} />
      </div>
      <div className="flex items-center justify-between p-4 px-[10%]">
        <Button onClick={handlePrev}>Back</Button>
        <p className="text-xl">{page}</p>

        <Button onClick={handleNext}>Next</Button>
      </div>
    </nav>
  )
}

export default NavBar
/* 
const NavBar = () => {
  return <></>
}

export default NavBar
 */