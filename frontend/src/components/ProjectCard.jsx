import React from 'react';

const ProjectCard = ({ project }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img
                src={project.image}
                alt={project.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {project.description}
                </p>
                <button
                    disabled
                    className="text-gray-400 font-semibold text-sm cursor-not-allowed uppercase tracking-wide border border-gray-200 px-4 py-2 rounded"
                >
                    Read More
                </button>
            </div>
        </div>
    );
};

export default ProjectCard;
