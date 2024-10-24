import React, { useState, useEffect } from 'react';
import{
    Trash2,
    Pencil
} from 'lucide-react';

export default function CrudTableProjects() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [data, setData] = useState();


    useEffect( () =>{
        fetch('http://localhost:3000/api/projects')
        .then( (response) =>{
            if(!response.ok) throw new Error ('Network response was not ok');
            return response.json();
        })
        .then((data) => {
            setData(data); // Set the data
            setLoading(false); // Data has been loaded
        })
        .catch((error) => {
            setError(error.message); // Handle errors
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }
    
    if (error) {
        return <div>Error: {error}</div>; // Show error state
    }

    return (
        <div className="container mx-auto p-4 overflow-y mb-7">
        <h1 className="text-3xl font-bold mb-4 text-indigo-700 bg-indigo-200 p-5 rounded-xl translate-y-11 mx-3">Projects</h1>
        {/* Table */}
        <table className="min-w-full border-none text-gray-900 bg-white shadow-md rounded-xl ">
            <thead className="text-sm text-gray-500 h-28 align-bottom">
            <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">ICON</th>
                <th className="py-2 px-4 border-b">TITLE</th>
                <th className="py-2 px-4 border-b">SUMMARY</th>
                <th className="py-2 px-4 border-b">DEMO</th>
                <th className="py-2 px-4 border-b">REPO</th>
                <th className="py-2 px-4 border-b">WEBSITE</th>
                <th className="py-2 px-4 border-b">SKILLS</th>
                <th className="py-2 px-4 border-b">ACTIONS</th>
            </tr>
            </thead>
            <tbody>
                
            {data.map((project, index) => (
                <tr key={project._id} className="border-b">
                <td className="py-2 px-4">{index+1}</td>
                <td className="py-2 px-4 w-7">
                    <img src={project.icon} alt='icon'/>
                </td>
                <td className="max-w-48 py-2 px-4">{project.title}</td>
                <td className="max-w-56 truncate overflow-hidden ... text-sm py-2 px-4">{project.shortDesc}</td>
                <td className="py-2 px-4">
                    <a href={project.urlDemo} className="text-sm text-sky-700 hover:underline">Demo</a>
                </td>
                <td className="py-2 px-4">
                    <a href={project.urlRepo} className=" text-sm text-sky-700 hover:underline">Repo</a>
                </td>
                <td className="py-2 px-4">
                    { project.urlWebsite ? (
                    <a href={project.urlWebsite} className="text-sm text-sky-700 hover:underline">Website</a>
                    ):(
                        <p className='text-sm text-gray-400 disabled:opacity-75'>No data</p>
                    )
                }
                </td>
                <td className="py-2 px-4">
                    {project.skills.map( (value, index) =>(
                        <p key={index} className='bg-gradient-to-b from-green-600 to-green-700 rounded-full text-xs text-gray-200 m-1 px-2 text-center'>
                            {value}
                        </p>
                    ))}
                </td>
                <td className="py-4 px-4 flex">
                    <button
                    onClick={() => handleEdit(project.id)}
                    className="bg-transparent px-2 py-1 mr-2"
                    >
                    <Pencil size={18}/>
                    </button>
                    <button
                    onClick={() => handleDelete(project.id)}
                    className="bg-green-700 outline-transparent text-gray-200 px-2 py-2 rounded-full hover:bg-red-600 hover:outline-red-500"
                    >
                    <Trash2 size={18}/>
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}