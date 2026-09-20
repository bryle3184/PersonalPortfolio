import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
      <p className="label text-vermilion">Printer's error</p>
      <h1 className="mt-6 font-display text-7xl font-light leading-none tracking-[-0.01em] sm:text-8xl">
        404
      </h1>
      <p className="mt-6 max-w-sm font-grotesk text-base leading-relaxed text-ink-soft">
        The page you're after has gone to the binding queue. It isn't here, but the rest of the archive is.
      </p>
      <Link to="/" className="btn-outline mt-10">
        <ArrowLeft className="h-4 w-4" />
        Back to the index
      </Link>
    </div>
  );
}