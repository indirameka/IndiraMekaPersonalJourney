import Navigation from "@/components/Navigation";
import BlogSection from "@/components/Blog";
import Footer from "@/components/Footer";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <BlogSection />
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
