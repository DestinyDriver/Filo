'use client';
import React, { useState } from 'react';
import { Rabbit } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Lottie from 'lottie-react';
import folderAnimation from "@/assest/dark.json"
import { toast } from 'sonner';
import AlertMessage from '@/app/(dashboard)/_components/AlertMessage';
import { useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';




const FileViewer = ({ shortUrlId }) => {
const [fileNotFound, setfileNotFound] = useState(false)
  const [fileInfo, setfileInfo] = useState(null)
  const [Loading, setLoading] = useState(true)
  const [password, setpassword] = useState(null)
  const [inputPassword, setinputPassword] = useState(null)

  
  

  useEffect(() => {
    const completeShortUrl=`${window.location.origin}/view-file/${shortUrlId}`
    const fetchData=async()=>{
      const {data,error}=await supabase
          .from('filoinfo')
          .select('*')
          .eq('short_url',completeShortUrl)
          .single();

      if(error){
        console.log("error occured in FileViewer in fetchData ",error.message);
        setLoading(false);
        setfileNotFound(true);

        toast("Something went Wrong")

        return;
      }
      setpassword(data.password)
      setfileInfo(data);
      setLoading(false);
      
    }
    if(shortUrlId) fetchData();
    
  }, [shortUrlId])

  const handleDownload = async () => {
  try {
    const response = await fetch(fileInfo.file_url, { mode: 'cors' }); // Ensure CORS is handled properly
    const blob = await response.blob();

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileInfo.file_name || 'download'; // use file name if available
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url); // Cleanup
  } catch (error) {
    console.error('Download failed:', error);
    toast("Download Failed")
  }
};



  if(Loading||fileNotFound){
      return (
        <>
        <AlertMessage/>
        <div className='flex justify-center items-center m-auto h-[100vh]'>{Loading?(<>Loading...</>):fileNotFound?(<>File Not Found ❌</>):<></>}</div></>
    )
  }

  


  
    




  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full p-4 space-y-4 bg-neutral-900 text-white">
      
      {/* Logo */}
      <div className="flex items-center gap-2 font-medium">
        <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
          <Rabbit className="size-4" />
        </div>
        <span className="text-lg">Filo Inc.</span>
      </div>

      {/* File Sharing Card */}
      <div className="rounded border border-neutral-700 bg-neutral-800 p-6 w-full max-w-md flex flex-col gap-4">
        <p className="text-center text-lg md:text-xl font-semibold"><strong className='text-green-500 text-xl md:text-2xl'>{fileInfo.user_name}</strong> shared a file with you </p>
        <p className="text-center text-neutral-400 text-sm">Find the details below</p>

        {/* Lottie Animation */}
        <div className="w-40 mx-auto rounded">
          <Lottie animationData={folderAnimation} loop={true}  />
        </div>

        <p className="text-center text-sm ">
          File name: <span className="font-medium">{fileInfo.file_name}</span> <br />
          Type: <span className="font-medium">{fileInfo.file_type}</span> <br />
          Size: <span className="font-medium">{(fileInfo.file_size/(1024*1024)).toFixed(2)} MB</span>
        </p>

        <Input type="password" placeholder="Enter the password to access" className="bg-neutral-700 text-white" onChange={(el)=>{setinputPassword(el.target.value)}} />
        <Button className="w-full bg-green-500 hover:bg-green-600" disabled={password&&password!=inputPassword} onClick={handleDownload} >Download</Button>

        <p className="text-xs text-neutral-500 text-center">* Terms and conditions apply</p>
      </div>
    </div>
  );
};

export default FileViewer;
