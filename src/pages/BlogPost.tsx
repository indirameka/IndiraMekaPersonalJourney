import { useParams, useNavigate } from "react-router-dom";
import { Calendar, ArrowLeft, Clock } from "lucide-react";

function renderText(text: string): (string | JSX.Element)[] {
  const tokenRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)|\*\*(.+?)\*\*/g;
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    if (match[1] !== undefined) {
      parts.push(
        <a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:opacity-80 transition-opacity">
          {match[1]}
        </a>
      );
    } else {
      parts.push(<strong key={match.index}>{match[3]}</strong>);
    }
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
      "IMAGE:/blog/wonders-personal.jpg|Six wonders down — one still waiting. The journey continues.",
    ],
  },
  "tomatoes": {
    title: "How Growing My Own Tomatoes Ruined Store-Bought Ones",
    date: "November 28, 2025",
    category: "Gardening",
    readTime: "4 min read",
    content: [
      "Growing has always been my passion — but I didn't expect it to ruin tomatoes for me.",
      "The first time I ate one straight from my garden, it was different. Sweeter, juicier, full of life. After that, store-bought tomatoes just didn't compare.",
      "I tried everything — heirlooms, cherry, beefsteak — and one thing stood out: **the closer to natural (non-GMO/heirloom), the better the taste.**",
      "Living in California, I explored what's available here: Early Girl (balanced and reliable), Campari (juicy and slightly sweet), Roma (great for cooking but milder), and heirlooms like Brandywine (rich, complex, and closest to that bold flavor I grew up with in India).",
      "But even the best store options can't match a tomato ripened fully on the vine.",
      "Now, my favorite salad is the simplest: just fresh tomatoes, a pinch of salt, and maybe olive oil.",
      "Planting marigolds and zinnias brought in pollinators, improved the garden ecosystem, and over time, even the tomatoes felt more vibrant in flavor.",
      "The only problem? Once you've had a real tomato, there's no going back.",
      "IMAGE:/blog/tomatoes-detail.jpg|Fresh from the garden — nothing store-bought comes close.",
    ],
  },
  "entrepreneurship-journey": {
    title: "From No Dreams to Building Them: My Unexpected Journey into Entrepreneurship",
    date: "March 27, 2026",
    category: "Entrepreneurship",
    readTime: "5 min read",
    content: [
      "I didn't grow up dreaming of becoming an entrepreneur. There was no grand vision—just curiosity, hobbies, and a willingness to try things. For the longest time, I thought that's all it would ever be.",
      "SECTION:Finding Interest Where I Least Expected It",
      "It started with a fixer-upper. Not a business plan, just a space that needed work. As I got involved, I found myself drawn to the process—transforming something neglected into something alive again. That's when I realized I wasn't just helping—I was building.",
      "IMAGE:/blog/entrepreneur-before.jpg|Before — a kitchen waiting to be transformed.",
      "IMAGE:/blog/entrepreneur-after.jpg|After — the same space, completely reimagined.",
      "SECTION:The Backyard That Changed Everything",
      "After the renovation, an empty backyard sparked a new idea. Around 2018, when ADUs were just emerging, I decided to build one. It wasn't easy—there were unknowns everywhere—but it was exciting. When it was done, it became proof that I could create something meaningful from nothing.",
      "IMAGE:/blog/entrepreneur-adu.jpg|The first ADU build — proof that something meaningful can come from nothing.",
      "SECTION:When a Hobby Becomes a Business",
      "That first ADU wasn't meant to start a business—but it did. One project led to another. People noticed. Opportunities came in. Slowly, what began as curiosity turned into something real.",
      "IMAGE:/blog/entrepreneur-house.jpg|One project led to another — and slowly, a business took shape.",
      "SECTION:Still Building",
      "I'm still learning, still building. I didn't start with a dream—I built one along the way. And sometimes, that's all it takes. Check out more at [INBA-Designs.com](https://www.inba-designs.com)",
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
      "IMAGE:/blog/slow-travel-detail.jpg|Somewhere between the fifteenth country and the twentieth, the counting stopped.",
    ],
  },
};

const slugMap: Record<number, string> = {
  0: "chasing-wonders",
  1: "tomatoes",
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
              <figure key={i} className="space-y-3">
                <img
                  src={paragraph.replace("IMAGE:", "").split("|")[0].trim()}
                  alt=""
                  className="w-full rounded-2xl object-cover"
                />
                {paragraph.includes("|") && (
                  <figcaption className="text-center text-muted-foreground text-sm italic">
                    {paragraph.split("|")[1].trim()}
                  </figcaption>
                )}
              </figure>
            ) : paragraph.startsWith("HIGHLIGHT:") ? (
              <p key={i} className="text-foreground text-lg leading-relaxed font-bold italic">
                {renderText(paragraph.replace("HIGHLIGHT:", "").trim())}
              </p>
            ) : paragraph.startsWith("SECTION:") ? (
              <h2 key={i} className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-10 mb-2">
                {paragraph.replace("SECTION:", "").trim()}
              </h2>
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
