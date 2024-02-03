import React from 'react';
import service from '../appwrite/configuration';
import { Link } from 'react-router-dom';

function PostCard({ $id, Title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='flex flex-col justify-between p-3 items-center min-h-[220px] bg-gray-100 shadow rounded-2xl'>
                <div className="w-full justify-center mb-4">
                    <img
                        src={service.getFilePreview(featuredImage)}
                        alt={Title}
                        className='rounded-xl' />
                </div>
                <h2
                    className='text-xl h- font-semi-bold text-center'
                >{Title}</h2>
            </div>
        </Link>
    )
}

export default PostCard