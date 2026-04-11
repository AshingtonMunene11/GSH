export default function TopLine() {
  const messages = [
    { text: "Welcome to Giddy Sports Hub — Great deals every day!", color: "green" },
    { text: "Visit our shop at Accra Road, Superior Arcade, Mezzanine Floor!", color: "green" },
    { text: "Checkout our sales offer and grab massive discounts NOW!!", color: "green" },
  ];

  return (
    <div className="w-full h-[20px] bg-[#f4821f] flex items-center overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee gap-24 px-4">
        {messages.map((msg, i) => (
          <span
            key={i}
            className={`text-sm ${
              msg.color === "green"
                ? "text-[#126936] animate-blink"
                : "text-white"
            }`}
          >
            {msg.text}
          </span>
        ))}
      </div>
    </div>
  );
}
