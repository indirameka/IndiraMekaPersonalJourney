import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import travel1 from "@/assets/travel-gallery-1.jpg";
import travel2 from "@/assets/travel-gallery-2.jpg";
import travel3 from "@/assets/travel-gallery-3.jpg";
import travel4 from "@/assets/travel-gallery-4.jpg";
import travel5 from "@/assets/travel-gallery-5.jpg";
import travel6 from "@/assets/travel-gallery-6.jpg";

const photos = [
  { src: travel1, caption: "Lakeside reflections in the Swiss Alps" },
  { src: travel2, caption: "Golden hour at an Asian coastal town" },
  { src: travel3, caption: "Winding roads through rural Europe" },
  { src: travel4, caption: "Highland meadows at dawn" },
  { src: travel5, caption: "Open road adventures across continents" },
  { src: travel6, caption: "Majestic mountain peaks at sunrise" },
];

const TravelGallery = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(null);

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
            mountain peaks to coastal towns and everything in between.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl cursor-pointer"
              onClick={() => setSelected(index)}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="absolute bottom-4 left-4 right-4 text-primary-foreground text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {photo.caption}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          className="fixed inset-0 bg-foreground/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-6 right-6 text-primary-foreground hover:text-primary transition-colors"
            onClick={() => setSelected(null)}
          >
            <X size={32} />
          </button>
          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[selected].src}
              alt={photos[selected].caption}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
            <p className="text-center text-primary-foreground mt-4 text-lg">
              {photos[selected].caption}
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="text-primary-foreground hover:text-primary transition-colors disabled:opacity-30"
                disabled={selected === 0}
                onClick={() => setSelected((s) => (s !== null ? s - 1 : s))}
              >
                ← Previous
              </button>
              <button
                className="text-primary-foreground hover:text-primary transition-colors disabled:opacity-30"
                disabled={selected === photos.length - 1}
                onClick={() => setSelected((s) => (s !== null ? s + 1 : s))}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelGallery;
