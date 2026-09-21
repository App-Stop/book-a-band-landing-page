import { stats } from "./site-content";

export default function StatsGrid() {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[1.56cqw]">
      {stats.map(({ value, label, accent }) => (
        <li
          key={label}
          className="glass-soft flex flex-col items-center gap-2.5 rounded-[20px] p-6 text-center transition-transform duration-200 hover:-translate-y-1 lg:gap-[0.62cqw] lg:rounded-[1.04cqw] lg:px-[1cqw] lg:pb-[1.46cqw] lg:pt-[1.56cqw]"
        >
          <p
            className="bg-clip-text text-[28px] font-bold leading-normal text-transparent lg:text-[max(28px,1.875cqw)] lg:leading-[1.3]"
            style={{
              backgroundImage: `linear-gradient(to bottom, #ffffff, ${accent})`,
            }}
          >
            {value}
          </p>
          <p className="text-sm leading-normal text-white/80 lg:text-[max(14px,0.83cqw)] lg:leading-normal">
            {label}
          </p>
        </li>
      ))}
    </ul>
  );
}
