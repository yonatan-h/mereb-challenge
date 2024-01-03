import { GiLightSabers } from 'react-icons/gi'

export default function LoadingError({ refresh }) {
    return (
      <div className='flex justify-center py-12'>
        <div className=' flex flex-col items-center gap-3'>
          <GiLightSabers className='w-12 h-12 ' />
          <p>Could Not Load</p>
          <button className='text-[#f3ff00]' onClick={refresh}>
            Refresh
          </button>
        </div>
      </div>
    )
  }