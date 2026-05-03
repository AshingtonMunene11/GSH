
"use client";

export default function AboutSection() {
  const highlights = [
    {
      title: "Our Mission",
      text: "We provide durable, high-quality sports equipment at affordable prices, empowering communities through sports."
    },
    {
      title: "What We Offer & Why Choose Us",
      text: "From footballs and sportswear to training gear, we deliver a wide range of carefully selected products with wholesale pricing and convenient ordering."
    },
    {
      title: "Our Location & Connect With Us",
      text: "Find us along Accra Road, Nairobi. Reach us via info@giddysporthub.co.ke, WhatsApp Business, or visit our website for quick orders."
    }
  ];

  return (
    <section className="bg-[#126936] text-white py-16 px-6 text-center">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Title */}
        <h1 className="text-3xl font-bold">About Giddy Sports Hub</h1>
        <p className="text-lg leading-relaxed max-w-3xl mx-auto">
          Giddy Sports Hub is your trusted destination for high-quality sports equipment at affordable wholesale prices. Based in Nairobi, Kenya, we serve athletes, teams, schools, and sports enthusiasts with reliable gear that enhances performance and passion for the game.
        </p>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg bg-[#126936] transition duration-300 hover:bg-[#f4821f] hover:text-[#126936]"
            >
              <h2 className="text-xl font-semibold mb-3">{item.title}</h2>
              <p className="text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
