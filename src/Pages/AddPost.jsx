import React from 'react'
import { Container, PostForm } from '../components/index'

function AddPost() {
    return (
        <div className='flex min-h-screen justify-center'>
            <Container>
                <PostForm />
            </Container>
        </div>
    )
}

export default AddPost