import { useParams, useNavigate } from "react-router-dom";
import { Calendar, ArrowLeft, Clock } from "lucide-react";

const posts: Record<
  string,
  {
    title: string;
    date: string;
    category: string;
    readTime: string;
    content: string[];
    headerImage?: string;
  }
> = {
  "chasing-wonders": {
    title: "Chasing Wonders: From a Song to Six (and One More to Go)",
    date: "March 24, 2026",
    category: "Travel",
    readTime: "5 min read",
    headerImage: "/blog/wonders-personal.jpg",
    content: [
      "It started with a song—Puvvulo Daagunna (Telugu version) from the movie Jeans—where director S. Shankar took viewers across breathtaking man-made wonders of the world. As I watched those visuals unfold, a quiet dream took root: what if I could one day stand in each of those places myself, not just as a viewer, but as a traveler living that story?",
      "Years later, that dream turned into a journey. One by one, I found myself walking through history, culture, and human brilliance—six of the New Seven Wonders checked off, each carrying its own story, emotion, and sense of awe. Yet one remains—Petra—waiting patiently as the world settles and borders become safer, holding space for the final chapter of this personal quest.",
      "QUOTE:Travel makes one modest. You see what a tiny place you occupy in the world. — Gustave Flaubert",
      "This journey was never just about ticking destinations off a list; it was about chasing a feeling sparked by a song, and discovering how far a single moment of inspiration can carry you across the world. And when the time is right, Petra will not just be the last wonder—it will be the one that completes the story.",
    ],
  },
  "japanese-countryside": {
    title: "Finding Serenity in the Japanese Countryside",
    date: "December 15, 2025",
    category: "Travel",
    readTime: "8 min read",
    content: [
      "There's a particular kind of quiet that exists in rural Japan — not silence exactly, but a settled, deliberate stillness that seems to hold the world gently in place. I discovered it on a rain-soaked morning in the Kiso Valley, where wooden post towns have stood largely unchanged for centuries.",
      "I had been in Tokyo for a week — overstimulated, caffeinated, and utterly enchanted — when a local suggested I take the Chuo Line west and lose myself for a few days. 'The real Japan is not in the neon,' she said. 'It is in the mist between the cedar trees.'",
      "The post towns of Magome and Tsumago lie along the old Nakasendo highway, a route that connected Edo to Kyoto long before bullet trains existed. Walking between them on cobblestoned paths worn smooth by centuries of feet, I felt unmoored from time in the best possible way.",
      "Every inn, or minshuku, I stayed at was run by an older couple. Breakfasts were elaborate arrangements of pickled vegetables, miso soup, grilled fish, and steamed rice — food that tasted unmistakably like care. The hosts would bow on my arrival and bow again deeper on my departure, as though my presence had been a gift rather than a transaction.",
      "What struck me most was how beauty here was found in restraint. A single branch of plum blossoms in a ceramic vase. A moss-covered stone lantern at the edge of a gravel path. These weren't decorative gestures — they were philosophy made visible.",
      "I came home lighter. Not just in luggage, but in expectation. The Japanese countryside reminded me that the most beautiful destinations are often unmarked on tourist maps, quietly waiting for those patient enough to wander off the main road.",
    ],
  },
  "winter-garden-planning": {
    title: "Winter Garden Planning: A Complete Guide",
    date: "November 28, 2025",
    category: "Gardening",
    readTime: "12 min read",
    content: [
      "By the time the first hard frost settles over the beds and the last of the autumn squash has been harvested, most gardeners retreat indoors with a warm cup of something and a stack of seed catalogues. This is not idleness — this is the most important work of the growing year.",
      "Winter planning is where gardens are truly made. The physical labour of spring and summer is only possible because of the dreaming, sketching, and reading done in the colder months.",
      "Start with a soil audit. Pull out last year's notes (you kept notes, right?) and review what grew well, what struggled, and where the drainage problems showed up in wet weeks. Soil is a living system and it has a memory. Work with it, not against it.",
      "Crop rotation is non-negotiable for long-term garden health. A simple rule: don't grow the same plant family in the same bed more than once every three years. This breaks pest and disease cycles naturally and gives your soil a chance to replenish specific nutrients.",
      "Now is also the time to plan your companion planting combinations. Basil beside tomatoes, nasturtiums at the bed edges to deter aphids, dill to attract beneficial insects — these relationships take time to understand but pay off enormously once they become habitual.",
      "Order your seeds early. The best heirloom varieties from smaller seed companies sell out by January. I keep a seed library in old glass jars, sorted by plant family, labelled by harvest date and germination rate. It's one of the most satisfying filing systems I own.",
      "Finally, don't forget to rest. The garden rests in winter. So should you. This is the season for nourishing the gardener, not just the garden.",
    ],
  },
  "slow-travel": {
    title: "The Art of Slow Travel: Less Places, More Meaning",
    date: "November 10, 2025",
    category: "Travel",
    readTime: "6 min read",
    content: [
      "Somewhere between my fifteenth country and my twentieth, I stopped counting. Not because the numbers stopped mattering, but because I'd begun to understand that the number was the wrong metric entirely.",
      "For years I travelled the way many of us are taught to — quickly, efficiently, checking places off a list. Two days in Prague, three in Vienna, a frantic overnight train to Budapest. I saw a great deal. I understood very little.",
      "The shift happened in Portugal. I'd booked two weeks in Lisbon intending to use it as a base for day trips to Sintra, the Alentejo, Porto. Instead, I found myself returning to the same café every morning, learning the names of the pastry cases, getting drawn into a neighbourhood festival I stumbled upon, and spending an entire afternoon following a grandmother through a market simply because she seemed to know exactly what she was doing.",
      "That was the trip that changed how I travel. Slow travel is not lazy travel — it is intentional travel. It means choosing depth over breadth, conversation over sights, repetition over novelty.",
      "When you return to the same street corner every evening, you begin to notice things: how the light changes, who walks by at what hour, which dog always sleeps in the same doorway. These details are the texture of a place, invisible on a two-hour walking tour.",
      "I've since spent three weeks in a single village in Umbria, a month on one island in Greece, ten days in a mountain town in Peru with no tourist infrastructure whatsoever. These were not 'off the beaten path' adventures in the Instagram sense. They were simply time, given generously to a place.",
      "Travel fewer places. Stay longer. Learn the name of your server. The world will reveal more of itself to you than you could ever find in a highlights reel.",
    ],
  },
};

const slugMap: Record<number, string> = {
  0: "chasing-wonders",
  1: "japanese-countryside",
  2: "winter-garden-planning",
  3: "slow-travel",
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = slug ? posts[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
            Post not found
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-primary font-medium"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12 max-w-3xl">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-primary font-medium mb-10 hover:gap-3 transition-all duration-300"
        >
          <ArrowLeft size={18} />
          Back to Blog
        </button>

        <div className="mb-6">
          <span className="bg-secondary px-4 py-1.5 rounded-full text-sm font-medium text-primary">
            {post.category}
          </span>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
          {post.title}
        </h1>

        {post.headerImage && (
          <img
            src={post.headerImage}
            alt={post.title}
            className="w-full rounded-2xl mb-8 object-cover max-h-[480px]"
          />
        )}

        <div className="flex items-center gap-5 text-muted-foreground text-sm mb-12 pb-8 border-b border-border">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {post.readTime}
          </span>
        </div>

        <div className="space-y-6">
          {post.content.map((paragraph, i) =>
            paragraph.startsWith("QUOTE:") ? (
              <blockquote
                key={i}
                className="border-l-4 border-primary pl-6 italic text-muted-foreground text-lg leading-relaxed"
              >
                {paragraph.replace("QUOTE:", "").trim()}
              </blockquote>
            ) : (
              <p key={i} className="text-foreground text-lg leading-relaxed">
                {paragraph}
              </p>
            )
          )}
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300"
          >
            <ArrowLeft size={18} />
            Back to Blog
          </button>
        </div>
      </div>
    </div>
  );
};

export { slugMap };
export default BlogPost;
