
import BackButton from "@/components/BackButton";

export default function ProjectsPage() {
    const projects = [
        {
            year: "2023",
            title: "Portfolio Website",
            madeAt: "Personal Project",
            builtWith: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
            link: "https://yourdomain.com",
        },
        {
            year: "2022",
            title: "E-Commerce Platform",
            madeAt: "TechCorp",
            builtWith: ["React", "Node.js", "MongoDB", "Express"],
            link: "https://example.com",
        },
        {
            year: "2021",
            title: "Health Tracking App",
            madeAt: "Wellness Inc",
            builtWith: ["React Native", "Firebase", "TypeScript"],
            link: "https://healthapp.com",
        },
    ];

    return (
        <div className='w-full py-10'>
            <BackButton />
            <h1 className='text-4xl font-bold mb-8'>All Projects</h1>

            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-700'>
                    <thead>
                        <tr>
                            <th className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-300 sm:pl-0'>Year</th>
                            <th className='px-3 py-3.5 text-left text-sm font-semibold text-gray-300'>Project</th>
                            <th className='px-3 py-3.5 text-left text-sm font-semibold text-gray-300'>Made at</th>
                            <th className='px-3 py-3.5 text-left text-sm font-semibold text-gray-300'>Built with</th>
                            <th className='px-3 py-3.5 text-left text-sm font-semibold text-gray-300'>Link</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-700'>
                        {projects.map((project, index) => (
                            <tr key={index} className='hover:bg-gray-800/30'>
                                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:pl-0'>{project.year}</td>
                                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300 font-semibold'>{project.title}</td>
                                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-400'>{project.madeAt}</td>
                                <td className='whitespace-nowrap px-3 py-4 text-sm'>
                                    <div className='flex flex-wrap gap-2'>
                                        {project.builtWith.map((tech, techIndex) => (
                                            <span key={techIndex} className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-900/30 text-teal-300 border border-teal-700/30'>
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className='relative whitespace-nowrap px-3 py-4 text-sm font-medium'>
                                    <a href={project.link} className='text-blue-400 hover:text-blue-300 flex items-center' target='_blank' rel='noopener noreferrer'>
                                        {new URL(project.link).hostname}
                                        <svg className='w-4 h-4 ml-1' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'></path>
                                        </svg>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
