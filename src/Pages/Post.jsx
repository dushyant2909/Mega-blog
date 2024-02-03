import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import service from '../appwrite/configuration'
import { Button } from '../components/index'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'

function Post() {
    const [post, setPost] = useState(null)
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.readPost(slug)
                .then((post) => {
                    if (post)
                        setPost(post);
                    else
                        navigate('/');
                })
            console.log("POST: ", post);
        }
        else
            navigate('/');
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletePost(post.$id)
            .then((status) => {
                if (status) {
                    service.deleteFile(post.featuredImage);
                    toast.success("Post deleted successfully")
                    navigate('/');
                }
            })
    };

    return post ? (
        <div className="mt-10 p-7 min-h-screen flex flex-col items-center ">
            <div className="flex flex-col items-center p-5 rounded-xl bg-gray-300">
                <div className="max-w-[700px] flex justify-center mb-4 relative rounded-xl">
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3 border border-black/40 hover:shadow" text="text-black">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" className="border border-black/40 hover:shadow"
                                onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-5">
                    <h1 className="text-2xl font-bold">{post.Title}</h1>
                </div>
                <div className="w-full">
                    {parse(post.content)}
                </div>
            </div>
        </div>
    ) : null;
}

export default Post