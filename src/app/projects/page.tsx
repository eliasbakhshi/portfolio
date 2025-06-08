export type Projects = [
    {
        title: "string",
        description: "string",
        link: "string",
    }
];

export default function ProjectsPage() {

    return (
        <div>test</div>
        // <div className="flex flex-col items-center justify-center min-h-screen">
        //     <h1 className="text-4xl font-bold mb-8">Projects</h1>
        //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        //         {projects.map((project, index) => (
        //             <div key={index} className="p-6 border rounded-lg shadow-lg">
        //                 <h2 className="text-2xl font-semibold mb-4">{project.title}</h2>
        //                 <p className="mb-4">{project.description}</p>
        //                 <a href={project.link} className="text-blue-500 hover:underline">
        //                     View Project
        //                 </a>
        //             </div>
        //         ))}
        //     </div>
        // </div>
    );
}
