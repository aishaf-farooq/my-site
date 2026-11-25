// Station 2.3's counting method, drawn as a two-way table from live data.
// Imagine 10,000 cases, split them by "has the condition" and "got flagged",
// then read the posterior straight off the Flagged column.

interface TwoWayTableProps {
  baseRate: number;
  hitRate: number;
  falseAlarmRate: number;
}

const N = 10000;

function fmt(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export function TwoWayTable({ baseRate, hitRate, falseAlarmRate }: TwoWayTableProps) {
  const hasCondition = N * baseRate;
  const clean = N - hasCondition;
  const trueFlags = hasCondition * hitRate;
  const missed = hasCondition - trueFlags;
  const falseFlags = clean * falseAlarmRate;
  const cleanPassed = clean - falseFlags;
  const totalFlagged = trueFlags + falseFlags;
  const totalNotFlagged = missed + cleanPassed;

  const cell = "border border-black/10 px-3 py-2 text-right tabular-nums dark:border-white/15";
  const head = "border border-black/10 px-3 py-2 text-left font-semibold dark:border-white/15";

  return (
    <div className="mt-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted">
        Imagine {fmt(N)} cases
      </p>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full max-w-xl border-collapse text-sm">
          <thead>
            <tr>
              <th className={head}></th>
              <th className={`${head} text-right`}>Flagged</th>
              <th className={`${head} text-right`}>Not flagged</th>
              <th className={`${head} text-right`}>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className={head}>Has the condition</th>
              <td className={`${cell} font-semibold text-accent`}>{fmt(trueFlags)}</td>
              <td className={cell}>{fmt(missed)}</td>
              <td className={cell}>{fmt(hasCondition)}</td>
            </tr>
            <tr>
              <th className={head}>Clean</th>
              <td className={cell}>{fmt(falseFlags)}</td>
              <td className={cell}>{fmt(cleanPassed)}</td>
              <td className={cell}>{fmt(clean)}</td>
            </tr>
            <tr>
              <th className={head}>Total</th>
              <td className={`${cell} font-semibold`}>{fmt(totalFlagged)}</td>
              <td className={cell}>{fmt(totalNotFlagged)}</td>
              <td className={cell}>{fmt(N)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-muted">
        Read the Flagged column: {fmt(trueFlags)} real cases out of {fmt(totalFlagged)} flags
        = {totalFlagged > 0 ? (trueFlags / totalFlagged).toFixed(3) : "n/a"}.
      </p>
    </div>
  );
}
