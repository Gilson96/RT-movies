import { Divider } from "@chakra-ui/react";
import { TiSocialLinkedinCircular, TiSocialGithubCircular } from "react-icons/ti";

const Footer = () => {
    return (
        <footer className="h-[20rem] w-full flex flex-col justify-between items-start px-[2%] py-[10%] bg-black text-white">
            <h1>Logo</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div className="flex">
                <TiSocialLinkedinCircular className="h-[3rem] w-[3rem]"/>
                <TiSocialGithubCircular className="h-[3rem] w-[3rem]"/>
            </div>
            <Divider/>
            <p className="px-[2%] italic">Created by Gilson de Almeida - 2024</p>
        </footer>
    )
}

export default Footer