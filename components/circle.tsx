import Image from 'next/image'
import { useState, useEffect } from 'react'

// import image from '@images/circle'
import BC1 from '@public/circle/BC1.png'
import BC2 from '@public/circle/BC2.png'
import BC3 from '@public/circle/BC3.png'
import BC4 from '@public/circle/BC4.png'
import BC5 from '@public/circle/BC5.png'
import BC6 from '@public/circle/BC6.png'
import ClearBC from '@public/circle/ClearBC.png'
import SC1 from '@public/circle/SC1.png'
import SC2 from '@public/circle/SC2.png'
import SC3 from '@public/circle/SC3.png'
import SC4 from '@public/circle/SC4.png'
import SC5 from '@public/circle/SC5.png'
import ClearSC from '@public/circle/ClearSC.png'

const Circle_Circle = ({ page }: { page: number }) => {
  const [currentPage, setCurrentPage] = useState(page)

  useEffect(() => {
    setCurrentPage(page)
  }, [page])

  const ShowCircle = () => {
    switch (currentPage) {
      case 1:
        return (
          <>
            <Image src={BC1} width={70} height={70} />
            <Image src={SC1} width={17} height={17} />
            <Image src={ClearBC} width={70} height={70} />
            <Image src={ClearSC} width={17} height={17} />
            <Image src={ClearBC} width={70} height={70} />
            <Image src={ClearSC} width={17} height={17} />
            <Image src={ClearBC} width={70} height={70} />
            <Image src={ClearSC} width={17} height={17} />
            <Image src={ClearBC} width={70} height={70} />
            <Image src={ClearSC} width={17} height={17} />
            <Image src={ClearBC} width={70} height={70} />
          </>
        )
      case 2:
        return (
          <>
            <Image src={BC1} width={70} height={70} />
            <Image src={SC1} width={17} height={17} />
            <Image src={BC2} width={70} height={70} />
            <Image src={SC2} width={17} height={17} />
            <Image src={ClearBC} width={70} height={70} />
            <Image src={ClearSC} width={17} height={17} />
            <Image src={ClearBC} width={70} height={70} />
            <Image src={ClearSC} width={17} height={17} />
            <Image src={ClearBC} width={70} height={70} />
            <Image src={ClearSC} width={17} height={17} />
            <Image src={ClearBC} width={70} height={70} />
          </>
        )
      case 3:
        return (
          <>
            <Image src={BC1} width={70} height={70} />
            <Image src={SC1} width={17} height={17} />
            <Image src={BC2} width={70} height={70} />
            <Image src={SC2} width={17} height={17} />
            <Image src={BC3} width={70} height={70} />
            <Image src={SC3} width={17} height={17} />
            <Image src={ClearBC} width={70} height={70} />
            <Image src={ClearSC} width={17} height={17} />
            <Image src={ClearBC} width={70} height={70} />
            <Image src={ClearSC} width={17} height={17} />
            <Image src={ClearBC} width={70} height={70} />
          </>
        )
      case 4:
        return (
          <>
            <Image src={BC1} width={70} height={70} />
            <Image src={SC1} width={17} height={17} />
            <Image src={BC2} width={70} height={70} />
            <Image src={SC2} width={17} height={17} />
            <Image src={BC3} width={70} height={70} />
            <Image src={SC3} width={17} height={17} />
            <Image src={BC4} width={70} height={70} />
            <Image src={SC4} width={17} height={17} />
            <Image src={ClearBC} width={70} height={70} />
            <Image src={ClearSC} width={17} height={17} />
            <Image src={ClearBC} width={70} height={70} />
          </>
        )
      case 5:
        return (
          <>
            <Image src={BC1} width={70} height={70} />
            <Image src={SC1} width={17} height={17} />
            <Image src={BC2} width={70} height={70} />
            <Image src={SC2} width={17} height={17} />
            <Image src={BC3} width={70} height={70} />
            <Image src={SC3} width={17} height={17} />
            <Image src={BC4} width={70} height={70} />
            <Image src={SC4} width={17} height={17} />
            <Image src={BC5} width={70} height={70} />
            <Image src={SC5} width={17} height={17} />
            <Image src={ClearBC} width={70} height={70} />
          </>
        )
      case 6:
        return (
          <>
            <Image src={BC1} width={70} height={70} />
            <Image src={SC1} width={17} height={17} />
            <Image src={BC2} width={70} height={70} />
            <Image src={SC2} width={17} height={17} />
            <Image src={BC3} width={70} height={70} />
            <Image src={SC3} width={17} height={17} />
            <Image src={BC4} width={70} height={70} />
            <Image src={SC4} width={17} height={17} />
            <Image src={BC5} width={70} height={70} />
            <Image src={SC5} width={17} height={17} />
            <Image src={BC6} width={70} height={70} />
          </>
        )
      default:
        return (
          <>
            <Image src={ClearBC} width={70} height={70} />
            <Image src={ClearSC} width={17} height={17} />
            <Image src={ClearBC} width={70} height={70} />
            <Image src={ClearSC} width={17} height={17} />
            <Image src={ClearBC} width={70} height={70} />
            <Image src={ClearSC} width={17} height={17} />
            <Image src={ClearBC} width={70} height={70} />
            <Image src={ClearSC} width={17} height={17} />
            <Image src={ClearBC} width={70} height={70} />
            <Image src={ClearSC} width={17} height={17} />
            <Image src={ClearBC} width={70} height={70} />
          </>
        )
    }
  }

  return <ShowCircle />
}

export default Circle_Circle
