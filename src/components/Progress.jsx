// Gold top-center progress: current = elongated pill, others = small dots.
export default function Progress({ total, current }) {
  return (
    <div
      className="progress"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
      aria-label={`Алхам ${current + 1} / ${total}`}
    >
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`progress__node ${
            i === current ? 'progress__node--active' : ''
          } ${i < current ? 'progress__node--done' : ''}`}
        />
      ))}
    </div>
  )
}
