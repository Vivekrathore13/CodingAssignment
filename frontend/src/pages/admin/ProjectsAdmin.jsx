import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { PencilSquareIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

const ProjectsAdmin = () => {
    const [projects, setProjects] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ name: '', description: '', image: null });
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchProjects = async () => {
        try {
            const res = await api.get('/projects');
            setProjects(res.data);
        } catch (error) {
            console.error('Error fetching', error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            const file = e.target.files[0];
            setForm({ ...form, image: file });
            setPreview(URL.createObjectURL(file));
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('description', form.description);
        if (form.image) formData.append('image', form.image);

        try {
            if (isEditing) {
                // PUT request (Note: simplified, usually PUT might not update Image unless handled specifically)
                // The requirements say PUT /api/projects/:id 
                // We'll stick to updating text fields for edit in this simple implementation 
                // OR handle image if provided.
                await api.put(`/projects/${editId}`, {
                    name: form.name,
                    description: form.description
                });
            } else {
                await api.post('/projects', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            // Reset
            setForm({ name: '', description: '', image: null });
            setPreview(null);
            setIsEditing(false);
            setEditId(null);
            fetchProjects();
        } catch (error) {
            console.error('Error saving', error);
            alert('Failed to save project');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (project) => {
        setIsEditing(true);
        setEditId(project._id);
        setForm({ name: project.name, description: project.description, image: null });
        setPreview(project.image); // Show existing image
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await api.delete(`/projects/${id}`);
                fetchProjects();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Simple Sidebar Clone */}
            <aside className="w-64 bg-white shadow-md hidden md:block">
                <div className="p-6 border-b"><h2 className="text-2xl font-bold text-primary">AdminPanel</h2></div>
                <nav className="p-4 space-y-2">
                    <Link to="/admin/dashboard" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">Dashboard</Link>
                    <Link to="/admin/projects" className="block px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-bold">Projects</Link>
                    <Link to="/admin/clients" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">Clients</Link>
                    <Link to="/admin/contacts" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">Contacts</Link>
                    <Link to="/admin/subscribers" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">Subscribers</Link>
                </nav>
            </aside>

            <main className="flex-1 p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Projects</h1>

                {/* Form */}
                <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                    <h3 className="text-xl font-bold mb-4">{isEditing ? 'Edit Project' : 'Add New Project'}</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <input
                                    name="name" placeholder="Project Name" value={form.name} onChange={handleChange} required
                                    className="w-full border p-3 rounded-lg outline-none focus:border-primary"
                                />
                                <textarea
                                    name="description" placeholder="Description" value={form.description} onChange={handleChange} required
                                    className="w-full border p-3 rounded-lg outline-none focus:border-primary h-32"
                                />
                                {!isEditing && (
                                    <input
                                        type="file" name="image" onChange={handleChange} accept="image/*" required={!isEditing}
                                        className="w-full border p-2 rounded-lg"
                                    />
                                )}
                            </div>
                            <div className="flex items-center justify-center bg-gray-100 rounded-lg h-60 border-2 border-dashed border-gray-300">
                                {preview ? (
                                    <img src={preview} alt="Preview" className="h-full w-full object-cover rounded-lg" />
                                ) : (
                                    <span className="text-gray-400">Image Preview</span>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button type="submit" disabled={loading} className="bg-primary text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">
                                {loading ? 'Saving...' : (isEditing ? 'Update Project' : 'Create Project')}
                            </button>
                            {isEditing && (
                                <button type="button" onClick={() => { setIsEditing(false); setForm({ name: '', description: '', image: null }); setPreview(null); }} className="bg-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map(project => (
                        <div key={project._id} className="bg-white rounded-lg shadow p-4 flex gap-4 items-center">
                            <img src={project.image} alt={project.name} className="w-24 h-24 rounded object-cover" />
                            <div className="flex-1">
                                <h4 className="font-bold text-lg">{project.name}</h4>
                                <p className="text-gray-500 text-sm line-clamp-2">{project.description}</p>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <button onClick={() => handleEdit(project)} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><PencilSquareIcon className="w-5 h-5" /></button>
                                <button onClick={() => handleDelete(project._id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><TrashIcon className="w-5 h-5" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ProjectsAdmin;
