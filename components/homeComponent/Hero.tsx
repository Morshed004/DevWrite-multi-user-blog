export default function Hero() {
  return (
    <section className="min-h-[400px] w-full bg-[#f9fafb] relative py-20">
      {/* Diagonal Fade Center Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #d1d5db 1px, transparent 1px),
            linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
          WebkitMaskImage:
             "radial-gradient(ellipse 70% 70% at 50% 50%, #000 40%, transparent 80%)",
          maskImage:
             "radial-gradient(ellipse 70% 70% at 50% 50%, #000 40%, transparent 80%)",
        }}
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
          Welcome to DevWrite
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
          DevWrite is your hub for thoughtful writing on code, creativity and technology — written by developers, for developers.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
            Start Reading
          </button>
        </div>
      </div>
    </section>
  );
}