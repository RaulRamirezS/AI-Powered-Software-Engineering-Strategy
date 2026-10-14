import Link from 'next/link';

export default function NotFound() {
  return (
    <section className='flex min-h-[60vh] flex-col items-center justify-center bg-black px-6 text-center'>
      <p className='text-overline mb-4 font-public text-secondary'>404</p>
      <h1 className='text-title-h4 mb-6 font-anybody text-white'>This page isn&apos;t live yet</h1>
      <Link
        href='/solutions/ai-powered-software-engineering'
        className='ti-button bg-secondary px-8 py-3 text-secondary-accent hover:bg-secondary-light-1'
      >
        See AI-Powered Software Engineering
      </Link>
    </section>
  );
}
