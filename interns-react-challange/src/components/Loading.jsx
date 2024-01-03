import { GiLightSabers } from 'react-icons/gi'

export default function Loading() {
  return (
    <div className='flex justify-center py-12'>
      <div className=' flex flex-col items-center gap-3'>
        <GiLightSabers className='w-12 h-12 ' />
        <p>Loading ...</p>
      </div>
    </div>
  )
}
