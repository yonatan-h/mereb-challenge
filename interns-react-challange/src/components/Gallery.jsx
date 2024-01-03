import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'

export default function Gallery({ imageUrls }) {
  const [contactX, setContactX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const carousel = useRef(null)

  useEffect(() => {
    const endEvents = ['mouseup', 'mouseleave', 'touchend']
    const handleDragEnd = () => setIsDragging(false)
    endEvents.forEach((e) => window.addEventListener(e, handleDragEnd))

    return () => {
      endEvents.forEach((e) => window.removeEventListener(e, handleDragEnd))
    }
  }, [setIsDragging])

  const extractX = (e) => {
    if (e.clientX !== undefined) return e.clientX
    else if (e.touches !== undefined) return e.touches[0]
    else return 0
  }

  const handleDragStart = (e) => {
    setIsDragging(true)
    setContactX(extractX(e))
  }

  const handleDrag = (e) => {
    if (!isDragging || !carousel.current) return
    const newContactX = extractX(e)
    const dx = newContactX - contactX
    setContactX(newContactX)
    carousel.current.scrollLeft -= dx
  }

  const noImage = imageUrls.length === 0
  const oneImage = imageUrls.length === 1
  const manyImages = imageUrls.length > 1

  return (
    <div>
      {noImage && <hr />}

      {oneImage && (
        <img
          data-testid='gallery-img'
          src={imageUrls[0]}
          alt='character'
          className='max-w-full h-[500px] object-cover'
        />
      )}

      {manyImages && (
        <div
          className='overflow-scroll flex gap-6 cursor-pointer'
          ref={carousel}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          onMouseMove={handleDrag}
          onTouchMove={handleDrag}
        >
          {imageUrls.map((imageUrl, i) => (
            <img
              data-testid='gallery-img'
              className='
                    h-[500px] flex-shrink-0 object-cover
                    pointer-events-none
                  '
              key={i}
              src={imageUrl}
              alt='character'
            />
          ))}
        </div>
      )}
    </div>
  )
}
