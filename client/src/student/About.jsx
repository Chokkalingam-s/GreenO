import { useState, useEffect } from 'react';

export default function StudentHome() {
  const [activeSDG, setActiveSDG] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSDG((prev) => (prev === 15 ? 13 : 15));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[url('/forest-bg.jpg')] bg-cover bg-center bg-fixed">
      <div className="h-16 bg-gradient-to-b from-transparent to-black/20"></div>

      <section className="text-center py-6 backdrop-blur-md bg-white/70 rounded-b-lg shadow-md">
        {activeSDG === 15 ? (
          <div className="text-gray-800">
            <h2 className="text-4xl font-bold mb-2">🌍 Sustainable Development Goal 15</h2>
            <p className="text-lg max-w-2xl mx-auto">
              <strong>"Life on Land"</strong> focuses on protecting and restoring terrestrial ecosystems,
              forests, and reducing land degradation while mitigating the impacts of climate change.
            </p>
          </div>
        ) : (
          <div className="text-gray-800">
            <h2 className="text-4xl font-bold mb-2">🌏 Sustainable Development Goal 13</h2>
            <p className="text-lg max-w-2xl mx-auto">
              <strong>"Climate Action"</strong> emphasizes urgent actions to combat climate change and its impacts,
              fostering resilience and adaptation worldwide.
            </p>
          </div>
        )}
      </section>

      <section className="flex flex-col items-center text-center py-8 rounded-lg shadow-md backdrop-blur-lg bg-black/40 text-white mx-4 mt-6">
        <h1 className="text-4xl font-bold mb-4">🌱 Green O Initiative</h1>
        <p className="max-w-3xl text-md leading-relaxed">
          Empowering students to nurture and grow trees as part of their academic journey. Together,
          let’s make the planet greener, cleaner, and healthier—one student, one tree at a time.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6 mt-10 px-4">
        <div className="flex flex-col justify-center backdrop-blur-lg bg-white/70 p-4 rounded-lg shadow-md text-gray-800">
          <h2 className="text-2xl font-bold text-green-700 mb-2">About Green O</h2>
          <p className="leading-relaxed text-justify text-sm">
            The <strong>Green O Initiative</strong> blends education with environmental sustainability.
            By planting and nurturing trees during their academic journey, students can contribute to
            <strong> ecological conservation</strong> and gain a deeper understanding of their role
            in mitigating climate change.
          </p>
          <p className="mt-3 leading-relaxed text-justify text-sm">
            Each tree symbolizes hope, resilience, and a commitment to a brighter, greener future.
            The program nurtures a spirit of responsibility and ecological mindfulness in every
            participant.
          </p>
        </div>
        <img
          src="/home.jpg"
          alt="Green O Initiative"
          className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-500"
        />
      </section>

      <section className="mt-10 px-4">
        <div className="flex flex-col backdrop-blur-lg bg-white/70 p-6 rounded-lg shadow-md text-gray-800">
          <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">How It Works</h2>
          <ol className="space-y-4 list-decimal list-inside text-sm">
            <li>
              Enable location access for accurate tree monitoring and accountability.
            </li>
            <li>
              Upload a photo of your tree at the start of every semester to track its progress.
            </li>
            <li>
              Monitor and review your growth journey via your student dashboard.
            </li>
            <li>
              Receive recognition for contributing towards a sustainable planet!
            </li>
          </ol>
        </div>
      </section>

      <section className="mt-10 text-center">
        <button className="px-6 py-2 bg-green-700 text-white font-medium rounded-md shadow hover:bg-green-600 transition duration-300">
          Join the Initiative
        </button>
      </section>
    </div>
  );
}
