import { FiArrowDownRight } from 'react-icons/fi'

export default function Hero() {
  return (
    <section
      className='
        h-[60vh] min-h-[600px]
        grid grid-cols-2 relative
      '
    >
      <div className='outline outline-1 outline-[#4141417a] flex'></div>
      <div className='outline outline-1 outline-[#4141417a]'></div>
      <div className='outline outline-1 outline-[#4141417a]'></div>
      <div className='outline outline-1 outline-[#4141417a]'></div>
      <h1
        className='
          outline outline-2 outline-[#414141] p-6 bg-black
          text-4xl text-[#f3ff00] font-[600] text-center font-poller
          absolute top-[50%] left-[50%] transofrm translate-x-[-50%] translate-y-[-50%]
        '
      >
        STARWARS <br /> CHARACTERS
      </h1>

      <div
        className='
          w-6 h-6 bg-white transform rotate-45
          transofrm translate-x-[-50%] translate-y-[-50%]
          absolute bottom-[10%] left-[50%]
          flex items-center justify-center
        '
      >
        <FiArrowDownRight className='text-black' />
      </div>
    </section>
  )
}
