import React from 'react'
import Logo_Img from '../../public/Logo.png'

function Logo({ width = '100px' }) {
    return (
        <img src={Logo_Img} alt="Logo" className='rounded-md border border-black' width={width} />
    )
}

export default Logo