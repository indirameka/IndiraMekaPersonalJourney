import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X, ChevronLeft, ChevronRight, Leaf } from "lucide-react";
import garden1 from "@/assets/garden-gallery-1.jpg";
import garden2 from "@/assets/garden-gallery-2.jpg";
import garden3 from "@/assets/garden-gallery-3.jpg";
import garden4 from "@/assets/garden-gallery-4.jpg";
import garden5 from "@/assets/garden-gallery-5.jpg";
import garden6 from "@/assets/garden-gallery-6.jpg";
import garden7 from "@/assets/garden-gallery-7.jpg";
import garden8 from "@/assets/garden-gallery-8.jpg";
import garden9 from "@/assets/garden-gallery-9.jpg";
import garden10 from "@/assets/garden-gallery-10.jpg";

const photos = [
  { src: garden1,  caption: "One harvest, dozens of varieties — heirloom cherry tomatoes straight from the vine." },
  { src: garden2,  caption: "The full spectrum of a tomato harvest — every shape, size, and shade." },
  { src: garden3,  caption: "Jasmine in bloom — a fragrant corner of the garden." },
  { src: garden4,  caption: "Garden-fresh eggplants, harvested at their peak and ready for the kitchen." },
  { src: garden5,  caption: "A bowlful of green beans — the garden at its most generous." },
  { src: garden6,  caption: "Fresh cucumbers and homegrown herbs — the garden's daily offering." },
  { src: garden7,  caption: "Harvest day: cucumbers and fragrant curry leaves from the backyard." },
  { src: garden8,  caption: "A bowl full of sunshine — lemons fresh from the garden tree." },
  { src: garden9,  caption: "Crossandra in full bloom — a burst of orange against the garden wall." },
  { src: garden10, caption: "Tomatoes, eggplant, and greens — a mixed harvest straight from the soil." },
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
        alt={photo.caption}
        className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <p className="absolute bottom-0 left-0 right-0 px-4 py-5 text-primary-foreground text-sm leading-snug translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        {photo.caption}
      </p>
    </div>
  );
}

const GardenGallery = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selected === null) return;
      if (e.key === "ArrowRight") setSelected((s) => (s !== null && s < photos.length - 1 ? s + 1 : s));
      if (e.key === "ArrowLeft")  setSelected((s) => (s !== null && s > 0 ? s - 1 : s));
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
            Garden & Grow
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Seasons of patience, colour, and abundance — moments captured from my organic garden sanctuary.
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

          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={photos[selected].src}
              alt={photos[selected].caption}
              className="w-full max-h-[75vh] object-contain rounded-xl"
            />
            <div className="text-center mt-5">
              <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-1.5 rounded-full mb-2">
                <Leaf size={14} className="text-primary" />
                <span className="text-primary font-semibold text-sm">Garden</span>
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

export default GardenGallery;
