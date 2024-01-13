'use client'

const AnimatedButton = ({ text, ...props }) => (
    <button
        className="w-full p-2 text-left text-base md:text-sm focus:outline-none"
        {...props}>
        {text}
    </button>
)

export default AnimatedButton
