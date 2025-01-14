import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";

const TOGGLE_CLASSES =
  "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

type ToggleOptionsType = "watchlist" | "favourite";

const Toggle = () => {
  const [selected, setSelected] = useState<ToggleOptionsType>("watchlist");

  return (
    <div
      className='grid h-[200px] place-content-center px-4 transition-colors'
    >
      <SliderToggle selected={selected} setSelected={setSelected} />
    </div>
  );
};

const SliderToggle = ({ setSelected }: {
  selected: ToggleOptionsType;
  setSelected: Dispatch<SetStateAction<ToggleOptionsType>>;
}) => {
  return (
    <div className="relative flex w-fit items-center rounded-full">
      <button
        className={TOGGLE_CLASSES}
        onClick={() => {
          setSelected("watchlist");
        }}
      >
        <span className="relative z-10 text-white">Watchlist</span>
      </button>
      <button
        className={TOGGLE_CLASSES}
        onClick={() => {
          setSelected("favourite");
        }}
      >
        <span className="relative z-10 text-white">Favourite</span>
      </button>
      <div
        className={`absolute inset-0 z-0 flex`}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
        />
      </div>
    </div>
  );
};

export default Toggle;