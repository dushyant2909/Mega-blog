import React, { useState, useEffect } from 'react';
import service from '../appwrite/configuration';
import { Container, PostCard } from '../components/index'

function Homepage() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        service.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
    }, []);

    if (posts.length === 0) {
        return (
            <div className="w-full min-h-80 flex items-center justify-center text-center">
                <Container>
                    <div>
                        <h2 className='text-2xl font-semibold text-gray-600'>No posts found, create them!</h2>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full min-h-screen mt-10 py-7'>
            <Container>
                <div className='flex flex-wrap gap-5 mx-5'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-1 h-full inline-block w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Homepage