import { useState } from "react";
import { Bell } from "lucide-react";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xqegzyyl", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "New Blog Subscriber",
          subscriber_email: email,
          message: `New subscriber: ${email}`,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto bg-card rounded-2xl px-8 py-10 text-center shadow-sm border border-border">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Bell className="w-6 h-6 text-primary" />
          </div>

          <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
            Stay in the Loop
          </h2>
          <p className="text-muted-foreground mb-6">
            Get notified whenever I publish a new story — travel, garden, or entrepreneurship.
          </p>

          {status === "success" ? (
            <div className="text-primary font-medium">
              You're on the list! I'll notify you when new posts go live.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-all duration-300 hover:scale-105 whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {status === "sending" ? "Sending..." : "Notify Me"}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="text-sm text-red-500 mt-3">Something went wrong. Please try again.</p>
          )}

          <p className="text-xs text-muted-foreground mt-4">
            No spam, ever. Just a heads-up when something new is published.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
