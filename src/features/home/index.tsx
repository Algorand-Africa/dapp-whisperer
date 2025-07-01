import Link from "next/link";
import { FC } from "react";

export const Home: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-6 text-5xl md:text-7xl font-bold text-white">
          Dapp Whisperer
        </h1>
        <p className="mb-8 text-xl md:text-2xl text-white/90">
          Making Algorand dApp activity human-readable
        </p>
        <Link href="/app">
          <button
            className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold 
          hover:bg-purple-100 transform hover:scale-105 transition-all duration-200"
          >
            Explore the Chain
          </button>
        </Link>
      </section>

      {/* What is Section */}
      <section
        className="container mx-auto px-4 py-16 bg-white/10 backdrop-blur-lg rounded-3xl 
        my-8 mx-4 md:mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
          What is Dapp Whisperer?
        </h2>
        <p className="text-lg text-white/90 text-center max-w-3xl mx-auto">
          Dapp Whisperer provides an intuitive, graphical dashboard for tracking
          transactions, smart contracts, and interactions on the Algorand
          Blockchain. Our platform transforms complex blockchain data into
          clear, actionable insights.
        </p>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          Why use it?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 
              transform hover:scale-105 transition-all duration-200"
            >
              <div className="text-4xl mb-4 text-white">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GitHub CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <a
          href="https://github.com/Algorand-Africa/dapp-whisperer"
          className="inline-flex items-center px-8 py-3 bg-white text-purple-600 rounded-full 
          font-semibold hover:bg-purple-100 transform hover:scale-105 transition-all duration-200"
        >
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
              clipRule="evenodd"
            />
          </svg>
          Contribute on GitHub
        </a>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-white/80">
        <p>Built with ❤️ by the Dapp Whisperer team</p>
        <div className="mt-4 space-x-4">
          <a href="#" className="hover:text-white">
            Documentation
          </a>
          <a href="#" className="hover:text-white">
            About
          </a>
          <a href="#" className="hover:text-white">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    icon: "📊",
    title: "Human-Readable Logs",
    description:
      "Transform complex blockchain data into clear, understandable activity logs.",
  },
  {
    icon: "⚡",
    title: "Real-Time Updates",
    description: "Stay current with live updates from the Algorand blockchain.",
  },
  {
    icon: "🔓",
    title: "Open Source",
    description:
      "Free and open source. Contribute and help improve the platform.",
  },
  {
    icon: "✨",
    title: "Beautiful UI",
    description:
      "Enjoy a modern, responsive interface designed for all devices.",
  },
];
