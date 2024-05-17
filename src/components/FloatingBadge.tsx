import Image from 'next/image';

const FloatingBadge = () => {
  return (
    <div className="fixed bottom-0 right-0 z-10 p-4">
      <div className="flex items-center gap-2 p-4 bg-gray-200 dark:bg-zinc-800 rounded-lg shadow-lg">
        <a
          className="flex items-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            className="dark:invert"
            height={100}
            width={70}
            priority
          />
        </a>|

        <a
          className="flex items-center gap-2"
          href="https://github.com/andyrak"
          target="_blank"
          rel="noopener noreferrer"
        >
            Built by{' '}
            <Image
            src="/andyrak.jpeg"
            alt="andyrak on Github"
            height={32}
            width={32}
            className="rounded-full object-cover"
            priority
          />
          andyrak
        </a>
      </div>
    </div>
  );
};

export default FloatingBadge;