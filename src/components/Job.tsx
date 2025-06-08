export type jobProps = {
    title: string;
    company: string;
    location: string;
    description: string;
};

export default function Job({
    title,
    company,
    location,
    description,
    }: jobProps) {
    return (
        <div className="p-4 border rounded-lg shadow-md bg-white">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600">{company}</p>
        <p className="text-gray-500">{location}</p>
        <p className="mt-2 text-gray-700">{description}</p>
        </div>
    );
    }

