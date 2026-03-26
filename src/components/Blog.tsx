import { Calendar, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image?: string;
}

const Blog = () => {
  const navigate = useNavigate();

  const posts: BlogPost[] = [
    {
      slug: "chasing-wonders",
      title: "Chasing Wonders: From a Song to Six (and One More to Go)",
      excerpt:
        "It started with a song—and a quiet dream to one day stand at each of the New Seven Wonders. Six checked off, one still waiting. Here's the journey so far...",
      date: "March 24, 2026",
      category: "Travel",
      readTime: "5 min read",
      image: "/blog/wonders-collage.png",
    },
    {
      slug: "winter-garden-planning",
      title: "Winter Garden Planning: A Complete Guide",
      excerpt:
        "As the frost settles, it's the perfect time to dream and plan next season's garden. Here's my comprehensive approach...",
      date: "November 28, 2025",
      category: "Gardening",
      readTime: "12 min read",
    },
    {
      slug: "slow-travel",
      title: "The Art of Slow Travel: Less Places, More Meaning",
      excerpt:
        "In a world obsessed with bucket lists, I've discovered the transformative power of staying longer and going deeper...",
      date: "November 10, 2025",
      category: "Travel",
      readTime: "6 min read",
      image: "/blog/slow-travel-card.jpg",
    },
  ];

  return (
    <section id="blog" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              From the Blog
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Stories, insights, and guides from my adventures and garden journeys.
            </p>
          </div>
          <button
            onClick={() => navigate("/blog")}
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all duration-300"
          >
            View All Posts
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={post.title}
              className="bg-card rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-48 relative overflow-hidden">
                {post.image ? (
                  <>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-background/90 px-4 py-2 rounded-full text-sm font-medium text-primary">
                      {post.category}
                    </span>
                  </>
                ) : (
                  <div className="h-full bg-gradient-to-br from-sage-light to-terracotta-light flex items-center justify-center">
                    <span className="bg-background/90 px-4 py-2 rounded-full text-sm font-medium text-primary">
                      {post.category}
                    </span>
                  </div>
                )}
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
                <button
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  className="inline-flex items-center gap-2 mt-4 text-primary font-medium text-sm hover:gap-3 transition-all duration-300"
                >
                  Read More
                  <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
