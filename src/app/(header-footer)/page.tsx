import Link from 'next/link';
import Job from '@/components/Job';

export default function Home() {
    return (
        <>
            <div id='about' className='my-5'>
                <p>A passionate software engineer currently studying Software Engineering at Blekinge Institute of Technology (BTH). My journey as a developer started when I was 12 years old, and I thrive in collaborative environments where I can contribute with my <strong>creativity</strong> and <strong>problem-solving</strong> skills. My goal is to use my knowledge to create innovative solutions that have a positive impact.</p>
            </div>
            <div id='experience' className='mt-5'>
                <Job title="Full Stack Developer" company='Inter-Data' location='Hagfors' description='I developed multiple portals in a team, connecting them to an automation system (n8n.io) and focusing on UX/UI design.'/>
            </div>
            <div id='projects' className='mt-5'>
                <Link href='/projects'>Projects</Link>
            </div>
            <div id='contact' className='mt-5'>
                <Link href='/contact'>Contact</Link>
            </div>
        </>
    );
}
