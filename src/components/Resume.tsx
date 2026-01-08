import { Briefcase, GraduationCap, Award } from "lucide-react";

const Resume = () => {
  const experiences = [
    {
      period: "2021 - Present",
      title: "Senior Content Creator",
      company: "Wanderlust Media",
      description: "Leading creative campaigns for travel brands, producing engaging content across multiple platforms.",
    },
    {
      period: "2018 - 2021",
      title: "Travel Writer & Photographer",
      company: "Freelance",
      description: "Published in major travel magazines including Condé Nast Traveler, National Geographic, and Lonely Planet.",
    },
    {
      period: "2015 - 2018",
      title: "Content Strategist",
      company: "GreenThumb Digital",
      description: "Developed content strategies for sustainable living and gardening brands, growing audience by 300%.",
    },
  ];

  const education = [
    {
      year: "2015",
      degree: "MA in Creative Writing",
      institution: "University of Arts London",
    },
    {
      year: "2013",
      degree: "BA in Communications",
      institution: "New York University",
    },
  ];

  const skills = [
    "Travel Writing",
    "Photography",
    "Content Strategy",
    "Organic Gardening",
    "SEO & Digital Marketing",
    "Public Speaking",
    "Community Building",
    "Sustainable Living",
  ];

  return (
    <section id="resume" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            My Resume New
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A blend of creative passion and professional expertise, shaped by years of 
            exploration and continuous learning.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Experience */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground">Experience</h3>
            </div>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-l-2 border-border pb-6 last:pb-0"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-primary rounded-full" />
                  <span className="text-sm text-accent font-medium">{exp.period}</span>
                  <h4 className="font-serif text-lg font-bold text-foreground mt-1">
                    {exp.title}
                  </h4>
                  <p className="text-primary font-medium">{exp.company}</p>
                  <p className="text-muted-foreground mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Skills */}
          <div className="space-y-12">
            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground">Education</h3>
              </div>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="bg-card rounded-xl p-5">
                    <span className="text-sm text-accent font-medium">{edu.year}</span>
                    <h4 className="font-serif text-lg font-bold text-foreground mt-1">
                      {edu.degree}
                    </h4>
                    <p className="text-muted-foreground">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-sage-light rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground">Skills</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
