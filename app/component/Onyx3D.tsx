const LETTERS = "ONYXTECH".split("");
const ARC_DEGREES = 56;

export default function Onyx3D() {
  const getArc = (i: number) => {
    const mid = (LETTERS.length - 1) / 2;
    const dist = (i - mid) / mid;
    const angle = dist * (ARC_DEGREES / 2);
    const lift = -Math.pow(Math.abs(dist), 1.6) * 26;
    return { rotateX: angle, translateY: lift };
  };

  return (
    <div className="onyx-3d-stage">
      <div className="onyx-3d">
        {LETTERS.map((letter, i) => {
          const arc = getArc(i);
          return (
            <div
              key={i}
              className="letter-group"
              style={{
                transform: `rotateX(${arc.rotateX}deg) translateY(${arc.translateY}px)`,
              }}
            >
              {[0, 1, 2].map((layer) => (
                <span key={layer} className="onyx-layer">
                  {letter}
                </span>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}