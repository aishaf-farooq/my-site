// Station 2.4's four views of one Bernoulli random variable:
// table, math, graph, and node, all drawn from the live problem.

interface BernoulliFourViewsProps {
  theta: number;
  onSuccess: number;
  onFailure: number;
}

function num(n: number, digits = 2): string {
  return Number.isFinite(n) ? n.toFixed(digits) : "n/a";
}

export function BernoulliFourViews({ theta, onSuccess, onFailure }: BernoulliFourViewsProps) {
  const p1 = theta;
  const p0 = 1 - theta;
  const ev = p1 * onSuccess + p0 * onFailure;

  const card = "rounded-xl border border-black/10 p-4 dark:border-white/15";
  const label = "text-xs font-semibold uppercase tracking-widest text-muted";

  // Graph geometry: two bars, heights proportional to P(X = 0) and P(X = 1).
  const H = 90;
  const h0 = Math.max(0, Math.min(1, p0)) * H;
  const h1 = Math.max(0, Math.min(1, p1)) * H;

  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2">
      {/* 1. Table */}
      <div className={card}>
        <p className={label}>Table</p>
        <table className="mt-2 w-full text-sm">
          <thead>
            <tr className="text-left text-muted">
              <th className="py-1 font-semibold">x</th>
              <th className="py-1 font-semibold">P(X = x)</th>
              <th className="py-1 font-semibold">Payoff</th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            <tr>
              <td className="py-1">0</td>
              <td className="py-1">{num(p0)}</td>
              <td className="py-1">{num(onFailure)}</td>
            </tr>
            <tr>
              <td className="py-1">1</td>
              <td className="py-1">{num(p1)}</td>
              <td className="py-1">{num(onSuccess)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 2. Math */}
      <div className={card}>
        <p className={label}>Math</p>
        <p className="mt-2 font-mono text-sm">X ~ Bernoulli({num(theta)})</p>
        <p className="mt-1 font-mono text-sm">support = {"{0, 1}"}</p>
        <p className="mt-1 font-mono text-sm">
          E[payoff] = {num(p1)} × {num(onSuccess)} + {num(p0)} × {num(onFailure)}
        </p>
        <p className="mt-1 font-mono text-sm">= {num(ev)}</p>
      </div>

      {/* 3. Graph */}
      <div className={card}>
        <p className={label}>Graph</p>
        <svg viewBox="0 0 160 130" className="mt-2 h-32 w-full" role="img"
          aria-label={`Bar chart: P(X=0) = ${num(p0)}, P(X=1) = ${num(p1)}`}>
          <line x1="20" y1="105" x2="150" y2="105" stroke="currentColor" strokeOpacity="0.4" />
          <rect x="40" y={105 - h0} width="30" height={h0} fill="currentColor" fillOpacity="0.35" />
          <rect x="100" y={105 - h1} width="30" height={h1} className="fill-accent" />
          <text x="55" y="120" textAnchor="middle" fontSize="10" fill="currentColor">X = 0</text>
          <text x="115" y="120" textAnchor="middle" fontSize="10" fill="currentColor">X = 1</text>
          <text x="55" y={100 - h0} textAnchor="middle" fontSize="10" fill="currentColor">{num(p0)}</text>
          <text x="115" y={100 - h1} textAnchor="middle" fontSize="10" fill="currentColor">{num(p1)}</text>
        </svg>
      </div>

      {/* 4. Node */}
      <div className={card}>
        <p className={label}>Node</p>
        <div className="mt-4 flex justify-center">
          <div className="rounded-[50%] border-2 border-current px-6 py-4 text-center">
            <p className="text-sm font-semibold">X</p>
            <p className="font-mono text-xs">Bernoulli({num(theta)})</p>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-muted">
          One oval: a single random variable with no parents.
        </p>
      </div>
    </div>
  );
}
