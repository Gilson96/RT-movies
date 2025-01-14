import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

const TOGGLE_CLASSES =
    "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

const Toggle = ({
    isActive,
    setIsActive
}: {
    isActive: string, 
    setIsActive: Dispatch<SetStateAction<string>>
}
) => {

    return (
        <div
            className={`px-4 transition-colors`}>
            <SliderToggle isActive={isActive} setIsActive={setIsActive} />
        </div>
    );
};

const SliderToggle = ({ 
    isActive, 
    setIsActive 
}:{
    isActive: string,
    setIsActive: Dispatch<SetStateAction<string>>
}

) => {
    return (
        <div className="relative flex w-fit items-center rounded-full">
            <button
                className={`${TOGGLE_CLASSES} ${isActive === "watchlist" ? "text-white" : "text-slate-800"
                    }`}
                onClick={() => {
                    setIsActive("watchlist");
                }}
            >

                <span className="relative z-10">Watchlist</span>
            </button>
            <button
                className={`${TOGGLE_CLASSES} ${isActive === "favourite" ? "text-white" : "text-slate-800"
                    }`}
                onClick={() => {
                    setIsActive("favourite");
                }}
            >
                <span className="relative z-10">Favourite</span>
            </button>
            <div
                className={`absolute inset-0 z-0 flex ${isActive === "favourite" ? "justify-end" : "justify-start"
                    }`}
            >
                <motion.span
                    layout
                    transition={{ type: "spring", damping: 15, stiffness: 250 }}
                    className="h-full w-1/2 rounded-full bg-gradient-to-r from-gray-600 to-stone-600"
                />
            </div>
        </div>
    );
};

export default Toggle;