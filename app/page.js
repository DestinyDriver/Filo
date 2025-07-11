"use client"
import React from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Divide, Rabbit, Sun,Users,Star,ExternalLink, Settings } from 'lucide-react';
import Lottie from 'lottie-react';
import animationData from "@/public/FileAnimation.json";
import { useEffect, useState } from 'react';

import { Dancing_Script } from "next/font/google";
import { Fira_Code } from 'next/font/google'

const firacode = Fira_Code({
  subsets: ['latin'],
  weight: ['400'],  // bold
});


const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});



const Page = () => {
  const  [splash, setsplash] = useState(true);
  useEffect(() => {
    const timer=setTimeout(()=>{
      setsplash(false);
    },1000 )
  
    return () => {
      clearTimeout(timer);
    }
  }, [])

  if(splash){
    return(<>
    


      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
              <div className="flex items-center gap-2 self-center font-medium">
                <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                  <Rabbit className="size-4" />
                </div>
                Filo Inc.
              </div>
              
            </div>
          </div></>
    )
  }


  
  return (
    <div>
      <div className="w-[80%] m-auto py-4  ">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2 ">
          
          <div className='h-9 w-9 bg-gray-100 flex items-center justify-center rounded-md'><Rabbit className="text-gray-900 h-7 w-7 " /></div>
          
          <p className={`text-3xl  ${dancingScript.className} dark:text-gray-100 `}>Filo</p>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <Button variant="outlined" className={`border-1 border-neutral-800 text-gray-100`}>
            <Sun className="h-5 w-5" />
          </Button>
          <Button variant="secondary"><Link href='/files'>Open App</Link></Button>
        </div>
      </div>
      </div>

      <div className="py-2 px-2 flex justify-center space-x-8 text-sm font-semibold text-gray-400 ">
      {/* Users Section */}
      <div className="flex items-center space-x-1">
        <Users className='text-green-400 drop-shadow-[0_0_8px_#4ade80] h-4'/>
        <span>11 users</span> 
      </div>

      {/* GitHub Section */}
      <div className="flex items-center space-x-1 group">
        <Star className='text-green-600 h-4 drop-shadow-[0_0_8px_#4ade80] ' />
        <span className=' group-hover:text-gray-100 transition-colors duration-300 '>Star on GitHub</span>
        <ExternalLink className=' text-gray-500 h-3  group-hover:text-gray-100 transition-colors duration-300'/>
      </div>
    </div>


  <div className="w-[90%] max-w-7xl mx-auto py-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 mt-20">
  
  {/* Left Side: Text */}
  <div className="text-center lg:text-left space-y-6 w-full lg:w-1/2">
    <div className={`${firacode.className} text-gray-100 text-4xl md:text-5xl lg:text-6xl leading-tight`}>
      Upload.<span className="text-green-400">Share</span>.Done.
    </div>
    <p className="text-gray-400 text-base md:text-lg leading-relaxed">
      Make file sharing fast, secure, and hassle-free. Sign up, upload your files, and instantly get a shareable link. Keep your data safe while making file sharing easy across any device.
    </p>
    <Button variant="outline">Get Started</Button>
  </div>

  {/* Right Side: Animation */}
  <div className="flex justify-center w-full lg:w-1/2">
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ width: 300, height: 300 }}
    />
  </div>

</div>

    </div>

  );
};

export default Page;
