import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import data from "../lib/data";
import { resolveNextProjects } from "../lib/covers";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import ProjectCard from "../components/ProjectCard";

/** Bare filenames in portfolio.json resolve to /images/projects/<file>. */
function imgSrc(file: string): string {
  return file.includes("/") ? file : `/images/projects/${file}`;
}

export default function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = data.projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
        <h1 className="font-display text-4xl font-light text-ink">No such page in the archive.</h1>
        <button onClick={() => navigate("/")} className="btn-outline mt-8">
          <ArrowLeft className="h-4 w-4" />
          Back to the index
        </button>
      </div>
    );
  }

  const index = data.projects.findIndex((p) => p.slug === project.slug);
  const reading = resolveNextProjects(project, data.projects);

  return (
    <div className="min-h-screen bg-paper">
      <Nav person={data.person} />

      {/* Back + issue meta */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-5 sm:px-8">
          <button onClick={() => navigate("/")} className="group inline-flex items-center gap-2 font-grotesk text-xs uppercase tracking-[0.2em] text-ink-soft hover:text-electric">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            All Works
          </button>
          <p className="font-grotesk text-[10px] uppercase tracking-[0.2em] text-ink-soft">
            Selected work — No. {String(index + 1).padStart(2, "0")} of {data.projects.length}
          </p>
        </div>
      </div>

      <main>
        {/* Hero section with cover */}
        <header className="border-b border-border">
          <div className="mx-auto max-w-[1240px] px-5 pb-4 pt-14 sm:px-8 lg:pt-20">
            <Reveal>
              <SectionLabel index={project.year}>{project.category}</SectionLabel>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-8 font-display text-5xl font-light leading-[0.95] tracking-[-0.01em] text-ink sm:text-6xl lg:text-7xl">
                {project.title}
                <span className="text-electric">.</span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-7 max-w-3xl font-display text-2xl font-light italic leading-snug text-ink-soft sm:text-3xl">
                {project.summary}
              </p>
            </Reveal>

            {/* Meta ledger */}
            <Reveal delay={200}>
              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-border bg-charcoal sm:grid-cols-4">
                {[
                  { label: "Year", value: project.year },
                  { label: "Role", value: project.role },
                  { label: "Duration", value: project.duration || "N/A" },
                  { label: "Category", value: project.category },
                ].map((m) => (
                  <div key={m.label} className="p-4">
                    <dt className="label text-[10px] text-ink-soft">{m.label}</dt>
                    <dd className="mt-2 font-display text-sm text-ink">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {/* Project links */}
            <Reveal delay={240}>
              <div className="mt-6 flex gap-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-electric"
                  >
                    <Github className="h-4 w-4 text-electric" />
                    View on GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-electric"
                  >
                    <ExternalLink className="h-4 w-4 text-electric" />
                    Live Demo
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </header>

        {/* Project imagery gallery */}
        {project.images && project.images.length > 0 && (
          <section className="border-b border-border">
            <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
              <Reveal>
                <SectionLabel index="01">Project Gallery</SectionLabel>
              </Reveal>

              <div className={`mt-10 ${project.images.length > 1 ? "grid gap-6 sm:grid-cols-2" : ""}`}>
                {project.images.map((file, i) => {
                  const src = imgSrc(file);
                  return (
                    <Reveal key={src} delay={80 + i * 60}>
                      <div className="group">
                        <img
                          src={src}
                          alt={`${project.title} screenshot ${i + 1}`}
                          className="relative w-full h-full min-h-[200px] rounded-xl border border-border bg-charcoal object-cover transition-shadow duration-300 group-hover:shadow-[0_0_40px_rgba(0,212,255,0.1)]"
                          loading={i === 0 ? "eager" : "lazy"}
                        />
                        {project.images && project.images.length > 1 && (
                          <p className="mt-3 font-grotesk text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                            Screenshot {i + 1} of {project.images.length}
                          </p>
                        )}
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Overview section */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
            <div className="grid gap-14 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Reveal>
                  <p className="label sticky top-24">Documentation</p>
                </Reveal>
              </div>

              <div className="space-y-12 lg:col-span-8">
                {/* Overview */}
                <Reveal delay={80}>
                  <div>
                    <h2 className="font-display text-2xl font-light text-ink sm:text-3xl">Overview</h2>
                    <p className="mt-6 font-grotesk text-base leading-relaxed text-ink-soft">
                      {project.overview ||
                        "This project represents a key piece of my development work. Details on challenge, approach, and outcome are documented below."}
                    </p>
                  </div>
                </Reveal>

                {/* Challenge */}
                {project.challenge && (
                  <Reveal delay={140}>
                    <div>
                      <h3 className="font-display text-xl font-light text-ink">The challenge</h3>
                      <p className="mt-4 font-grotesk text-base leading-relaxed text-ink-soft">
                        {project.challenge}
                      </p>
                    </div>
                  </Reveal>
                )}

                {/* Approach */}
                {project.approach && (
                  <Reveal delay={200}>
                    <div>
                      <h3 className="font-display text-xl font-light text-ink">My approach</h3>
                      <p className="mt-4 font-grotesk text-base leading-relaxed text-ink-soft">
                        {project.approach}
                      </p>
                    </div>
                  </Reveal>
                )}

                {/* Outcome */}
                {project.outcome && (
                  <Reveal delay={260}>
                    <div>
                      <h3 className="font-display text-xl font-light text-ink">The outcome</h3>
                      <p className="mt-4 font-grotesk text-base leading-relaxed text-ink-soft">
                        {project.outcome}
                      </p>
                    </div>
                  </Reveal>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        {project.features && project.features.length > 0 && (
          <section className="border-b border-border">
            <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
              <div className="grid gap-14 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <Reveal>
                    <p className="label sticky top-24">Features</p>
                  </Reveal>
                </div>
                <div className="lg:col-span-8">
                  <ol className="grid gap-px overflow-hidden border border-border bg-charcoal">
                    {project.features.map((f, i) => (
                      <Reveal key={f} delay={i * 40}>
                        <li className="flex gap-5 bg-paper p-6">
                          <span className="font-grotesk text-xs text-electric tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="font-display text-xl text-ink sm:text-2xl">{f}</span>
                        </li>
                      </Reveal>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tech Stack section */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
            <Reveal>
              <SectionLabel index="·">Technology Stack</SectionLabel>
            </Reveal>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {project.technologies.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Project links */}
        {(project.githubUrl || project.liveUrl) && (
          <section className="border-b border-border">
            <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
              <Reveal>
                <SectionLabel index="→">Project Links</SectionLabel>
              </Reveal>
              <div className="mt-8 flex flex-wrap gap-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 rounded-full border border-electric/30 bg-electric/5 px-6 py-3 font-grotesk text-sm font-medium uppercase tracking-[0.18em] text-electric transition-all duration-300 hover:border-electric hover:bg-electric/10"
                  >
                    <Github className="h-5 w-5" />
                    GitHub Repository
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 rounded-full border border-electric/30 bg-electric/5 px-6 py-3 font-grotesk text-sm font-medium uppercase tracking-[0.18em] text-electric transition-all duration-300 hover:border-electric hover:bg-electric/10"
                  >
                    <ExternalLink className="h-5 w-5" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Keep reading */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <SectionLabel index="→">Keep Reading</SectionLabel>
                <Link to="/" className="btn-outline group">
                  Back to Projects
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {reading.slice(0, 3).map((p, i) => (
                <Reveal key={p.slug} delay={i * 70}>
                  <ProjectCard project={p} index={data.projects.indexOf(p)} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer person={data.person} marquee={data.marquee} />
    </div>
  );
}
