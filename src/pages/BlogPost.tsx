import { useParams, useNavigate } from "react-router-dom";
import { Calendar, ArrowLeft, Clock } from "lucide-react";

function renderText(text: string): (string | JSX.Element)[] {
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(
      <a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:opacity-80 transition-opacity">
        {match[1]}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

const posts: Record<
  string,
  {
    title: string;
    date: string;
    category: string;
    readTime: string;
    content: string[];
  }
> = {
  "chasing-wonders": {
    title: "Chasing Wonders: From a Song to Six (and One More to Go)",
    date: "March 24, 2026",
    category: "Travel",
    readTime: "5 min read",
    content: [
      "It started with a song—[Puvvulo Daagunna (Telugu version)](https://youtu.be/NICkZRy64QY?si=jIZI-cL9uI3FWh7g) from the movie Jeans—where director S. Shankar took viewers across breathtaking man-made wonders of the world. As I watched those visuals unfold, a quiet dream took root: what if I could one day stand in each of those places myself, not just as a viewer, but as a traveler living that story?",
      "Years later, that dream turned into a journey. One by one, I found myself walking through history, culture, and human brilliance—six of the New Seven Wonders checked off, each carrying its own story, emotion, and sense of awe. Yet one remains—Petra—waiting patiently as the world settles and borders become safer, holding space for the final chapter of this personal quest.",
      "QUOTE:Travel makes one modest. You see what a tiny place you occupy in the world. — Gustave Flaubert",
      "This journey was never just about ticking destinations off a list; it was about chasing a feeling sparked by a song, and discovering how far a single moment of inspiration can carry you across the world. And when the time is right, Petra will not just be the last wonder—it will be the one that completes the story.",
      "IMAGE:/blog/wonders-personal.jpg",
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
      "Somewhere between my fifteenth country and my twentieth, I stopped counting. Not because the numbers stopped mattering, but because I began to realize that the number was the wrong measure entirely.",
      "For years, I traveled like most of us are taught — quickly, efficiently, checking boxes. I saw a lot. I understood very little.",
      "The realization came in China while visiting Beijing and Shanghai. I had planned a packed itinerary — the Forbidden City, the Great Wall, the Bund — but in the midst of it, I found myself pausing. I lingered in quiet tea houses, wandered down side streets, and listened to the rhythm of the city. It struck me that I had been moving too fast, chasing sights instead of experiences. That was the moment I understood what slow travel really meant.",
      "After China, everything changed. In Italy, I lingered in small piazzas, chatting with locals over espresso, watching life unfold around the fountains, and letting the rhythm of the streets guide my days. In Iceland, I wandered tiny fishing villages, followed the northern lights across the sky, and let the wind chart my path. In Banff, I hiked the Rockies without a strict plan, noticing the subtle changes in light across the mountains and the quiet patterns of wildlife. In Tamil Nadu, I moved at the pace of village life, following temple rituals and markets with no map but a willingness to be present.",
      "HIGHLIGHT:Slow travel is not lazy travel — it is intentional. It means choosing depth over breadth, conversation over sightseeing, repetition over novelty. When you return to the same street, trail, or temple every day, you begin to notice things: the way light hits the mountains, which fisherman always waves in the harbor, the rhythm of prayers in the temples. These small details are the texture of a place — invisible on a checklist.",
      "Since then, I've spent long afternoons simply watching life unfold, meditating beside waterfalls, hiking with no plan but to follow the trails, and wandering villages without a map. These were not 'hidden gems' for Instagram — they were simply time, given generously to a place.",
      "Travel fewer places. Stay longer. Learn the name of your guide, your server, the locals who make a place live. The world will reveal more of itself to you than any highlight reel ever could.",
      "IMAGE:/blog/slow-travel-detail.jpg",
    ],
  },
};

const slugMap: Record<number, string> = {
  0: "chasing-wonders",
  1: "winter-garden-planning",
  2: "slow-travel",
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
            paragraph.startsWith("IMAGE:") ? (
              <img
                key={i}
                src={paragraph.replace("IMAGE:", "").trim()}
                alt=""
                className="w-full rounded-2xl object-cover"
              />
            ) : paragraph.startsWith("HIGHLIGHT:") ? (
              <p key={i} className="text-foreground text-lg leading-relaxed font-bold italic">
                {renderText(paragraph.replace("HIGHLIGHT:", "").trim())}
              </p>
            ) : paragraph.startsWith("QUOTE:") ? (
              <blockquote
                key={i}
                className="border-l-4 border-primary pl-6 italic text-muted-foreground text-lg leading-relaxed"
              >
                {paragraph.replace("QUOTE:", "").trim()}
              </blockquote>
            ) : (
              <p key={i} className="text-foreground text-lg leading-relaxed">
                {renderText(paragraph)}
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
