import React from 'react'

function Button({ children,
    type = 'button',
    bgColor = 'bg-blue-600',
    text = 'text-white',
    className = '',
    ...props
}) {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-lg ${bgColor} ${text} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button