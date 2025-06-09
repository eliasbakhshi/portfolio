import Link from 'next/link';

export default function Home() {
    return (
        <>
            <div id='about' className='my-5'>
                <p>A passionate software engineer currently studying Software Engineering at Blekinge Institute of Technology (BTH). My journey as a developer started when I was 12 years old, and I thrive in collaborative environments where I can contribute with my <strong>creativity</strong> and <strong>problem-solving</strong> skills. My goal is to use my knowledge to create innovative solutions that have a positive impact.</p>
            </div>
            <h2 id='experience' className='text-2xl font-semibold h-screen'>
                <Link href='/experience'>Experience</Link>
            </h2>
            <h2 id='projects' className='text-2xl font-semibold h-screen'>
                <Link href='/projects'>Projects</Link>
            </h2>
            <h2 id='contact' className='text-2xl font-semibold h-screen'>
                <Link href='/contact'>Contact</Link>
            </h2>
        </>
    );
}
