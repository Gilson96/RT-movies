import { FilmIcon } from "@heroicons/react/24/outline";
import { TiSocialLinkedinCircular, TiSocialGithubCircular } from "react-icons/ti";
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="h-full w-full flex justify-between items-center p-[2%] bg-black text-white">
            <p className='h-full flex items-center border-r-2 pr-2 border-neutral-400'>
                <h2
                    className='hidden small-screen:block small-screen:font-bold small-screen:text-xl small-screen:text-2xl'>RT-Movies</h2>
                <FilmIcon className='h-9 w-9' />
            </p>
            <p className="px-[2%] italic">Created by Gilson de Almeida - 2024</p>
            <div className="flex">
               <Link className="hover:text-neutral-500" to={'https://linkedin.com/in/gilson-de-almeida-a51ba1194/'}><TiSocialLinkedinCircular className="h-[3rem] w-[3rem]" /></Link>
              <Link className="hover:text-neutral-500" to={'https://github.com/Gilson96/RT-movies'}><TiSocialGithubCircular className="h-[3rem] w-[3rem]" /></Link>
            </div>        
        </footer>
    )
}

export default Footer