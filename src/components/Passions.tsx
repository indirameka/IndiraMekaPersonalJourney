import travelImg from "@/assets/travel-1.jpg";
import gardenImg from "@/assets/garden-1.jpg";
import { MapPin, Leaf, Camera, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Passions = () => {
  const navigate = useNavigate();

  const galleryRoutes: Record<string, string> = {
    "Travel Adventures": "/gallery/travel",
    "Garden & Grow": "/gallery/garden",
  };

  const passions = [
    {
      title: "Travel Adventures",
      image: travelImg,
      description:
        "From the art and history of Italy to the diverse cultures of Asia and the open horizons of Australia and South America, travel has shaped who I am. Each place leaves me wiser, humbler, and more connected.",
      highlights: [
        "25+ Countries Explored",
        "Solo & Group Adventures",
        "Sustainable Travel Advocate",
      ],
      icon: MapPin,
      color: "terracotta",
    },
    {
      title: "Garden & Grow",
      image: gardenImg,
      description:
        "There’s something powerful about watching a tiny seed grow into food on your table. My garden is my sanctuary — where patience turns into nourishment.",
      highlights: [
        "Organic & Heirloom Varieties",
        "Companion Planting",
        "Pure, Pesticide-Free Growing",
      ],
      icon: Leaf,
      color: "sage",
    },
  ];

  return (
    <section id="passions" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            My Passions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Beyond work, these passions fuel my creativity and bring joy to everyday life.
          </p>
        </div>

        <div className="space-y-16 max-w-6xl mx-auto">
          {passions.map((passion, index) => (
            <div
              key={passion.title}
              className={`grid md:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <div className="relative group overflow-hidden rounded-2xl">
                  <img
                    src={passion.image}
                    alt={passion.title}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <button
                    onClick={() => navigate(galleryRoutes[passion.title])}
                    className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2 items-center cursor-pointer"
                  >
                    <Camera className="w-5 h-5 text-primary-foreground" />
                    <span className="text-primary-foreground text-sm font-medium">View Gallery</span>
                  </button>
                </div>
              </div>

              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      passion.color === "sage" ? "bg-sage-light" : "bg-terracotta-light"
                    }`}
                  >
                    <passion.icon
                      className={`w-6 h-6 ${
                        passion.color === "sage" ? "text-primary" : "text-accent"
                      }`}
                    />
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-foreground">
                    {passion.title}
                  </h3>
                </div>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  {passion.description}
                </p>
                <ul className="space-y-3">
                  {passion.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-center gap-3">
                      <Heart className="w-4 h-4 text-accent" />
                      <span className="text-foreground font-medium">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Passions;
