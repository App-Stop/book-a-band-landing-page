import { stats } from "./site-content";

export default function StatsGrid() {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[30px]">
      {stats.map(({ value, label, accent }) => (
        <li
          key={label}
          className="glass-soft flex flex-col items-center gap-2.5 rounded-[20px] p-6 text-center transition-transform duration-200 hover:-translate-y-1 lg:gap-3.5 lg:p-[30px]"
        >
          <p
            className="bg-clip-text text-[28px] font-bold leading-normal text-transparent lg:text-[36px]"
            style={{
              backgroundImage: `linear-gradient(to bottom, #ffffff, ${accent})`,
            }}
          >
            {value}
          </p>
          <p className="text-sm leading-normal text-white/80 lg:text-base">
            {label}
          </p>
        </li>
      ))}
    </ul>
  );
}
