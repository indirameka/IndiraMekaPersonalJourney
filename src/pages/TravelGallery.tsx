import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import travel1 from "@/assets/travel-gallery-1.jpg";
import travel2 from "@/assets/travel-gallery-2.jpg";
import travel3 from "@/assets/travel-gallery-3.jpg";
import travel4 from "@/assets/travel-gallery-4.jpg";
import travel5 from "@/assets/travel-gallery-5.jpg";
import travel6 from "@/assets/travel-gallery-6.jpg";
import travel7 from "@/assets/travel-gallery-7.jpg";
import travel8 from "@/assets/travel-gallery-8.jpg";
import travel9 from "@/assets/travel-gallery-9.jpg";
import travel10 from "@/assets/travel-gallery-10.jpg";

const photos = [
  {
    src: travel1,
    location: "Reykjavik, Iceland",
    caption: "Standing in the hush of an Icelandic winter, where the snow swallows every sound.",
  },
  {
    src: travel2,
    location: "Northern Lights, Iceland",
    caption: "The sky caught fire in green — a night on Iceland's Arctic coast I'll never forget.",
  },
  {
    src: travel3,
    location: "Jökulsárlón Glacier Lagoon, Iceland",
    caption: "Sitting quietly among ancient ice at Iceland's most ethereal glacier lagoon.",
  },
  {
    src: travel4,
    location: "Seattle, Washington, USA",
    caption: "Looking straight up at the Space Needle — an icon that earns its reputation.",
  },
  {
    src: travel5,
    location: "Bryce Canyon, Utah, USA",
    caption: "Weaving through Utah's cathedral of red rock hoodoos, carved by wind and time.",
  },
  {
    src: travel6,
    location: "Arches National Park, Utah, USA",
    caption: "Delicate Arch at golden hour — the stillness here is its own kind of awe.",
  },
  {
    src: travel7,
    location: "Laknavaram, Telangana, India",
    caption: "A solitary pagoda emerges through morning mist — the world perfectly reflected.",
  },
  {
    src: travel8,
    location: "Warangal, Telangana, India",
    caption: "Among the ancient red-stone ruins of the Kakatiya temples — history you can touch.",
  },
  {
    src: travel9,
    location: "Chichén Itzá, Mexico",
    caption: "El Castillo pyramid — one of the New Seven Wonders, rising from the Yucatán jungle.",
  },
  {
    src: travel10,
    location: "Cenote, Mexico",
    caption: "A hidden cenote in the Yucatán — jungle light reflected in still, dark water.",
  },
];

function GalleryCard({
  photo,
  index,
  onClick,
}: {
  photo: (typeof photos)[0];
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative group overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${(index % 4) * 80}ms` }}
      onClick={onClick}
    >
      <img
        src={photo.src}
        alt={photo.location}
        className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Always-visible location pill */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
        <MapPin size={12} className="text-primary" />
        <span className="text-xs font-semibold text-foreground">{photo.location}</span>
      </div>
      {/* Hover overlay with caption */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <p className="absolute bottom-0 left-0 right-0 px-4 py-5 text-primary-foreground text-sm leading-snug translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        {photo.caption}
      </p>
    </div>
  );
}

const TravelGallery = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selected === null) return;
      if (e.key === "ArrowRight") setSelected((s) => (s !== null && s < photos.length - 1 ? s + 1 : s));
      if (e.key === "ArrowLeft") setSelected((s) => (s !== null && s > 0 ? s - 1 : s));
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-primary font-medium mb-10 hover:gap-3 transition-all duration-300"
        >
          <ArrowLeft size={18} />
          Back to Passions
        </button>

        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Travel Adventures
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A glimpse into the places that have shaped my perspective — from
            Arctic glaciers to ancient temples and everything in between.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <GalleryCard
              key={index}
              photo={photo}
              index={index}
              onClick={() => setSelected(index)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          className="fixed inset-0 bg-foreground/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-6 right-6 text-primary-foreground hover:text-primary transition-colors"
            onClick={() => setSelected(null)}
          >
            <X size={32} />
          </button>

          <button
            className="absolute left-4 text-primary-foreground hover:text-primary transition-colors disabled:opacity-20 p-2"
            disabled={selected === 0}
            onClick={(e) => { e.stopPropagation(); setSelected((s) => (s !== null ? s - 1 : s)); }}
          >
            <ChevronLeft size={40} />
          </button>

          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[selected].src}
              alt={photos[selected].location}
              className="w-full max-h-[75vh] object-contain rounded-xl"
            />
            <div className="text-center mt-5">
              <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-1.5 rounded-full mb-2">
                <MapPin size={14} className="text-primary" />
                <span className="text-primary font-semibold text-sm">{photos[selected].location}</span>
              </div>
              <p className="text-primary-foreground/80 text-sm max-w-xl mx-auto mt-1">
                {photos[selected].caption}
              </p>
              <p className="text-primary-foreground/40 text-xs mt-3">
                {selected + 1} / {photos.length}
              </p>
            </div>
          </div>

          <button
            className="absolute right-4 text-primary-foreground hover:text-primary transition-colors disabled:opacity-20 p-2"
            disabled={selected === photos.length - 1}
            onClick={(e) => { e.stopPropagation(); setSelected((s) => (s !== null ? s + 1 : s)); }}
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TravelGallery;
