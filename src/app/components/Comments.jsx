"use client"
import React, { useState, useEffect } from 'react';

const SearchPost = () => {
    const [query, setQuery] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/comments?id=${query}`)
            .then(response => response.json())
            .then(data => setPosts(data));
    }, [query]);

    return (
        <div className='text-amber-50 px-4 py-4 flex flex-col justify-center items-center mx-6'>
            <h2 className='text-2xl'>Filter comments by id</h2> 
            <input className='border border-white rounded-4xl h-10 w-60 py-4 mt-4 text-center text-gray-400'
                placeholder="Insert ID" value={query} onChange={(event) => setQuery(event.target.value)} />
            <ul className='text-white mt-8'>
                {posts.map(post => (
                <li className='flex flex-col' key={post.id}>
                    <h3 className='text-start text-lg'><span className='text-emerald-400'>id: </span>{post.id}</h3>
                    <h4 className='text-start text-lg'><span className='text-emerald-400'>Name: </span>{post.name}</h4>
                    <h5 className="text-shadow-white text-lg"><span className='text-emerald-400'>Email: </span>{post.email}</h5>
                    <p className="text-shadow-white text-lg"><span className='text-emerald-400'>Comment: </span>{post.body}</p>
                </li>
                ))}
            </ul>
        </div>);
};

export default SearchPost;