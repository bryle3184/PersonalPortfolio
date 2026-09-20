import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import data from "../lib/data";
import { coverStyles, resolveNextProjects } from "../lib/covers";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import ProjectCard from "../components/ProjectCard";

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

  const c = coverStyles[project.cover];
  const index = data.projects.findIndex((p) => p.slug === project.slug);
  const reading = resolveNextProjects(project, data.projects);

  return (
    <div className="min-h-screen bg-paper">
      <Nav person={data.person} />

      {/* Back + issue meta */}
      <div className="border-b border-ink/15">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-5 sm:px-8">
          <button onClick={() => navigate("/")} className="group inline-flex items-center gap-2 font-grotesk text-xs uppercase tracking-[0.18em] text-ink-soft hover:text-ink">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            All works
          </button>
          <p className="font-grotesk text-[10px] uppercase tracking-[0.2em] text-ink-soft">
            Selected work — No. {String(index + 1).padStart(2, "0")} of {data.projects.length}
          </p>
        </div>
      </div>

      <main>
        {/* Masthead */}
        <header className="border-b border-ink/15">
          <div className="mx-auto max-w-[1240px] px-5 pb-4 pt-14 sm:px-8 lg:pt-20">
            <Reveal>
              <SectionLabel index={`${project.year}`}>{project.category}</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-8 font-display text-6xl font-light leading-[0.95] tracking-[-0.01em] sm:text-8xl">
                {project.title}
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-7 max-w-2xl font-display text-2xl font-light italic leading-snug text-ink-soft sm:text-3xl">
                {project.summary}
              </p>
            </Reveal>

            {/* Meta ledger */}
            <Reveal delay={200}>
              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-ink/15 bg-ink/15 sm:grid-cols-4">
                {[
                  { label: "Year", value: project.year },
                  { label: "Role", value: project.role },
                  { label: "Duration", value: project.duration },
                  { label: "Artefacts", value: String(project.features.length) },
                ].map((m) => (
                  <div key={m.label} className="bg-paper p-4">
                    <dt className="label text-[10px]">{m.label}</dt>
                    <dd className="mt-2 font-display text-sm text-ink">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </header>

        {/* Cover block */}
        <div className={`${c.bg} ${c.text}`}>
          <div className="mx-auto flex max-w-[1240px] flex-col gap-8 px-5 py-16 sm:px-8 lg:py-24">
            <div className={`flex items-start justify-between ${c.text}`}>
              <span className={`${c.chip} rounded-full px-3 py-1 font-grotesk text-[10px] uppercase tracking-[0.16em]`}>
                {project.category}
              </span>
              <span className="font-grotesk text-xs uppercase tracking-[0.16em] opacity-80">{project.year}</span>
            </div>
            <div className={`border-t ${c.rule} pt-8 sm:pt-12`}>
              <h2 className="font-display text-4xl font-light leading-[1.05] tracking-[-0.01em] sm:text-6xl">
                {project.title}
                <span className="text-vermilion">.</span>
              </h2>
            </div>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className={`font-display text-2xl font-light italic leading-snug ${c.text} opacity-90`}>
                  {project.overview}
                </p>
              </div>
              <div className="lg:col-span-5">
                <dl className="grid grid-cols-2 gap-px overflow-hidden border bg-transparent sm:grid-cols-3" style={{ borderColor: "currentColor", opacity: 0.9 }}>
                  {project.stats.map((s) => (
                    <div key={s.label} className={`p-3 ${c.chip} ${c.text}`}>
                      <dd className="font-display text-3xl font-light leading-none">{s.value}</dd>
                      <dt className="mt-2 font-grotesk text-[10px] uppercase tracking-[0.14em] opacity-80">{s.label}</dt>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative spread */}
        <section className="border-b border-ink/15">
          <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
            <div className="grid gap-14 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Reveal>
                  <p className="label sticky top-24">The brief — in three movements</p>
                </Reveal>
              </div>
              <div className="space-y-14 lg:col-span-8">
                {[
                  { n: "01", title: "The challenge", body: project.challenge },
                  { n: "02", title: "The approach", body: project.approach },
                  { n: "03", title: "The outcome", body: project.outcome },
                ].map((m, i) => (
                  <Reveal key={m.n} delay={i * 60}>
                    <div className="border-t border-ink/15 pt-5">
                      <p className="label flex items-center gap-3">
                        <span className="text-vermilion tabular-nums">{m.n}</span>
                        <span>{m.title}</span>
                      </p>
                      <p className="mt-4 font-grotesk text-base leading-relaxed text-ink sm:text-lg">{m.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-b border-ink/15">
          <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
            <div className="grid gap-14 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Reveal>
                  <SectionLabel index="+">What got shipped</SectionLabel>
                  <p className="mt-4 max-w-xs font-grotesk text-sm leading-relaxed text-ink-soft">
                    The four moves that carried the work — chosen to travel across platforms and seasons.
                  </p>
                </Reveal>
              </div>
              <div className="lg:col-span-8">
                <ol className="grid gap-px overflow-hidden border border-ink/15 bg-ink/15">
                  {project.features.map((f, i) => (
                    <Reveal key={f} delay={i * 50}>
                      <li className="flex gap-5 bg-paper p-6">
                        <span className="font-grotesk text-xs text-vermilion tabular-nums">
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

        {/* Kit */}
        <section className="border-b border-ink/15">
          <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
            <Reveal>
              <SectionLabel index="·">The kit</SectionLabel>
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

        {/* Keep reading */}
        <section className="border-b border-ink/15">
          <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <SectionLabel index="→">Keep reading</SectionLabel>
                <Link to="#contact" className="btn-outline group">
                  Work together
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2">
              {reading.map((p, i) => (
                <Reveal key={p.slug} delay={i * 70} className={i === 0 ? "md:col-span-2" : ""}>
                  <ProjectCard project={p} index={data.projects.indexOf(p)} featured={i === 0} />
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