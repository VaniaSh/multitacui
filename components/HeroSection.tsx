import React, {FC} from 'react';
import Image from 'next/image'
import war from '@/public/war-desert-guns-gunshow-163523.jpeg'
import {Button} from "@/components/ui/button";
type PageProps = {};

const HeroSection: FC<PageProps> = ({}) => {
    return (
        <div className="w-full px-5 md:px-24 mt-14">
            <div className="relative h-[400px] md:h-[600px]">
                <Image src={war} alt={'hero'} className="rounded-md" fill objectFit={'cover'}/>
                <div className="absolute w-full h-full bg-black/30"/>
                <div className="absolute w-5/6 md:w-1/5 border-white border p-3 rounded-lg backdrop-blur-md text-center text-white font-medium leading-none top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4">
                    <h1 className="text-4xl font-bold mb-2.5">MULTITAC</h1>
                    <p className="text-2xl mb-3">Твій магазин військової амуніції</p>
                    <Button variant={"secondary"} size={"lg"}>До каталогу</Button>
                </div>
            </div>
        </div>
    );
};
export default HeroSection
