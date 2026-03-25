import Navigation from "@/components/Navigation";
import BlogSection from "@/components/Blog";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <BlogSection />
      </div>
    </div>
  );
};

export default Blog;
