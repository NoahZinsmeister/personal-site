import { useRef } from 'react'

export default function Emoji({ emoji, label = 'emoji', size = '24px', onClick, ...rest }) {
  const ref = useRef<HTMLSpanElement>()

  function wrappedOnClick(event) {
    ref.current.blur()
    onClick(event)
  }

  function onEnterPressed(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      onClick(event)
    }
  }

  return (
    <>
      <span
        ref={ref}
        role="img"
        aria-label={label}
        onClick={!!onClick ? wrappedOnClick : undefined}
        onKeyPress={!!onClick ? onEnterPressed : undefined}
        tabIndex={!!onClick ? 0 : undefined}
        {...rest}
      >
        {emoji}
      </span>

      <style jsx>{`
        span {
          ${onClick ? `user-select: none;` : ''}
          font-size: ${size};
          line-height: ${size};
          width: ${size};
        }

        span:hover {
          ${onClick ? `cursor: pointer;` : ''}
        }

        span:active:focus {
          ${onClick ? `outline: none;` : ''}
        }
      `}</style>
    </>
  )
}
