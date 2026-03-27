import { useState } from "react";
import { Bell } from "lucide-react";

const MAILCHIMP_ACTION =
  "https://indirameka.us2.list-manage.com/subscribe/post?u=5f98eb895f419b3b60c189e44&id=5d2b22c972&f_id=0077a1e0f0";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email) setSubmitted(true);
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

          {submitted ? (
            <div className="text-primary font-medium">
              Thanks for subscribing! Check your inbox to confirm.
            </div>
          ) : (
            <form
              action={MAILCHIMP_ACTION}
              method="post"
              target="_blank"
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                name="EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
              />
              {/* Mailchimp bot protection — must stay hidden */}
              <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
                <input
                  type="text"
                  name="b_5f98eb895f419b3b60c189e44_5d2b22c972"
                  tabIndex={-1}
                  defaultValue=""
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-all duration-300 hover:scale-105 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-xs text-muted-foreground mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
