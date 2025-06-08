import Image from "next/image";

export default function Home() {
    return (
        <main className='grid grid-cols-12 mx-20 min-h-screen font-[family-name:var(--font-geist-sans)] bg-red-100'>
            <div id="left" className='bg-green-200 col-span-6 sticky top-0 left-0 max-h-64'>Elias Bakhshi</div>
            <div id="fight" className='bg-blue-200 col-span-6 h-[2000px]'>
                <p>This is the praragraph</p>
            </div>
        </main>
    );
}
