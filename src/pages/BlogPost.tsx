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
  "spring-gardening": {
    title: "How Spring Changed on Me: Gardening in Pleasanton Isn't What It Used to Be",
    date: "April 12, 2026",
    category: "Gardening",
    readTime: "6 min read",
    content: [
      "A few years ago, gardening felt predictable. Living in Pleasanton, I used to follow a simple rhythm:",
      "LIST:Start seeds in early spring||Transplant in April||Watch everything slowly come to life",
      "It worked. Almost every time. But over the past few seasons, I've found myself second-guessing everything. Because spring… just doesn't behave the same anymore.",
      "SECTION:🌦 The Moment I Realized Something Was Off",
      "I remember one March morning — I think it was 2021 — in Pleasanton. It felt like summer. Short sleeves. Bright sun. My plants were thriving. So I did what any gardener would do: I got excited and planted early.",
      "And then, just days later, the cold winds came back. Nights dropped. Growth stalled. Some of my seedlings didn't make it.",
      "That's when it hit me: **it's not just \"warmer\" now — it's wildly inconsistent.**",
      "SECTION:📊 What the Data Confirms (And We're Feeling in Our Backyards)",
      "What I experienced isn't just anecdotal — it's happening everywhere:",
      "LIST:Spring temperatures in the U.S. have increased by about 2.4°F since 1970||In California, we've warmed nearly 3°F over the past century||Over 95% of counties are seeing warmer springs",
      "But here's the real issue: **spring isn't just warmer — it's more unpredictable.** We're seeing sudden March heat spikes that feel like June, cold snaps after warm stretches, and longer dry periods followed by sudden changes. Even here in the Bay Area, we've had some of the warmest and driest early springs on record.",
      "IMAGE:/blog/spring-chart-1.jpg|Pleasanton Spring Temperature Trends (March vs April) — the numbers confirm what we're already feeling in the garden.",
      "SECTION:🌸 Plants Don't Know What to Do Anymore",
      "Plants don't follow calendars — we do. They respond to temperature, light, and soil conditions. And those signals are now out of sync.",
      "LIST:Plants are blooming weeks earlier than usual||Some growth cycles are shifting by up to a month or more",
      "But here's the problem I've seen in my own garden: **early growth doesn't mean safe growth.** Warm weather tricks plants into starting early — and then the cold comes back to undo all that progress.",
      "SECTION:🌱 What I Had to Unlearn as a Gardener",
      "This has been the hardest part. I had to let go of what used to work.",
      "**I stopped trusting the calendar.** \"Plant in March\" doesn't mean anything anymore. Now I ask: what's the soil temperature? What does the next 10-day forecast look like?",
      "**I don't trust one warm week anymore.** That one perfect week in March? It's misleading. I've learned the hard way to wait for consistent patterns — not just a few good days.",
      "**I take hardening off more seriously.** Before, I could rush this step. Now I don't. With unpredictable wind, sun, and temperature swings, seedlings need real time to adapt.",
      "**I watch watering much more closely.** With sudden weather shifts, soil dries faster than expected — or stays wet far longer than it should. There's no \"set schedule\" anymore.",
      "**I pay attention to my microclimate.** My backyard in Pleasanton has hot spots near walls, cooler shaded corners, and areas that dry out faster. What works in one part of my yard simply doesn't work in another.",
      "IMAGE:/blog/spring-chart-2.jpg|Expected vs Reality: Pleasanton Spring — what we planned for versus what the season actually delivered.",
      "SECTION:✅ What I Do Differently Now",
      "Instead of following rigid rules, I've shifted to observing and adapting. Here's what's working for me:",
      "LIST:Checking soil temperature before planting — not just the calendar date||Staggering planting times instead of putting everything in at once||Using frost covers when temperatures dip unexpectedly||Watching hyperlocal forecasts closely, not just regional weather||Choosing more resilient, heat-tolerant plant varieties",
      "SECTION:🌍 This Is Bigger Than My Garden",
      "At first, I thought I was just having a bad gardening year. But it's bigger than that.",
      "QUOTE:The truth is: the natural world is changing. — David Attenborough",
      "That sounds dramatic — but when you're watching your plants struggle with confused seasons, it starts to feel very real, very close to home.",
      "SECTION:🌿 Why This Matters for Growers Like Us",
      "This shift is exactly why I started building **Growers-Hub** — because gardening is no longer about following fixed schedules. It's about learning from each other in real time: what worked this week, what failed unexpectedly, what to try next.",
      "SECTION:🌱 Final Thought",
      "Living in Pleasanton, I've realized something important: the weather hasn't just changed — **the rules of gardening have changed.**",
      "And honestly? That's not a bad thing. It's forcing us to become more observant, more connected, and more adaptable.",
      "HIGHLIGHT:Because today, the best gardeners aren't the ones who follow the rules perfectly — they're the ones who adapt the fastest.",
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
            ) : paragraph.startsWith("LIST:") ? (
              <ul key={i} className="space-y-2 pl-5 text-foreground text-lg leading-relaxed list-disc">
                {paragraph.replace("LIST:", "").split("||").map((item, j) => (
                  <li key={j}>{renderText(item.trim())}</li>
                ))}
              </ul>
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
