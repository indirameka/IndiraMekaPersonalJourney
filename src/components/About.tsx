import { MapPin, Leaf, BookOpen } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: MapPin,
      title: "Travel Enthusiast",
      description: "Explored 25+ countries across 4 continents, seeking authentic experiences and cultural connections.",
    },
    {
      icon: Leaf,
      title: "Passionate Gardener",
      description: "Cultivating organic gardens for over 8 years, growing everything from heirloom tomatoes to rare flowers.",
    },
    {
      icon: BookOpen,
      title: "Storyteller",
      description: "Sharing adventures and insights through writing, photography, and meaningful conversations.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I believe life is meant to be lived fully—whether that's hiking through misty mountains, 
            getting my hands dirty in the garden, or penning thoughts that resonate with fellow dreamers. 
            My journey has taken me from bustling city streets to serene countryside paths, 
            and I bring all these experiences into everything I create.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <div
              key={item.title}
              className="bg-card rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="w-16 h-16 bg-sage-light rounded-2xl flex items-center justify-center mx-auto mb-6">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
