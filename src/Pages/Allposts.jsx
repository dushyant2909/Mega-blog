import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components/index'
import service from '../appwrite/configuration'

function Allposts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        service.getPosts()
            .then((post) => {
                if (post)
                    setPosts(post.documents)
            })
            .catch((error) => {
                console.log("Error in getting all posts: ", error);
            })
    }, [])

    return (
        <div className='w-full py-8'>
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard post={post} />
                        </div>))}
                </div>
            </Container>
        </div>
    )
}

export default Allposts