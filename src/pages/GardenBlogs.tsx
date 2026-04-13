import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";

const gardenPosts = [
  {
    slug: "spring-gardening",
    title: "How Spring Changed on Me: Gardening in Pleasanton Isn't What It Used to Be",
    excerpt:
      "A few years ago, gardening felt predictable. Over the past few seasons, I've found myself second-guessing everything — because spring just doesn't behave the same anymore...",
    date: "April 12, 2026",
    readTime: "6 min read",
    image: "/blog/spring-garden-card.jpg",
  },
  {
    slug: "tomatoes",
    title: "How Growing My Own Tomatoes Ruined Store-Bought Ones",
    excerpt:
      "Growing has always been my passion — but I didn't expect it to ruin tomatoes for me. Once you've had a real tomato, there's no going back...",
    date: "November 28, 2025",
    readTime: "4 min read",
    image: "/blog/tomatoes-detail.jpg",
  },
];

const GardenBlogs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-6 py-12 pt-28">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-primary font-medium mb-10 hover:gap-3 transition-all duration-300"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="text-center mb-14">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Garden Stories
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From seed to harvest — notes from the garden on growing, learning, and slowing down.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {gardenPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-card rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
              onClick={() => navigate(`/blog/${post.slug}`)}
            >
              <div className="h-56 relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-background/90 px-4 py-2 rounded-full text-sm font-medium text-primary">
                  Gardening
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {post.date}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                <div className="inline-flex items-center gap-2 mt-4 text-primary font-medium text-sm group-hover:gap-3 transition-all duration-300">
                  Read More
                  <ArrowRight size={16} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GardenBlogs;
