export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center bg-charcoal px-6 text-center text-paper">
      <div>
        <p className="eyebrow justify-center text-forest-300">404</p>
        <h1 className="mt-6 text-headline font-extrabold">Page not found.</h1>
        <a href="/" className="mt-10 inline-flex min-h-12 items-center rounded-full bg-paper px-6 font-semibold text-charcoal">
          Back to home
        </a>
      </div>
    </main>
  );
}
