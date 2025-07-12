"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CircleArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/utils/supabase/client";
import AlertMessage from "@/app/(dashboard)/_components/AlertMessage";
import { toast } from "sonner";
import Link from "next/link";
import { Copy } from 'lucide-react';


const FilePreviewClient = () => {
  const searchParams = useSearchParams();
  const docID = searchParams.get("docID");
  const [usepass, setusepass] = useState(false)
  const [fileInfo, setfileInfo] = useState()
  const [keyPassword, setkeyPassword] = useState()
  const [Loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData=async()=>{
      const {data,error}=await supabase
          .from('filoinfo')
          .select('*')
          .eq('id',docID)
          .single();

      if(error){
        toast("Failed to load file info.")
        return;
      }

      setfileInfo(data);
      if(data.password){
        setusepass(true);
        setkeyPassword(data.password);
      }

      setLoading(false);
      
    }

    if(docID) fetchData();
    
  }, [docID])


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fileInfo.short_url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 1.5 sec
      toast.success("Copied To Clipboard",{
               style: {
               background: "#16653466",  // green with transparency (similar opacity)
               color: "oklch(70.4% 0.191 142)",   // greenish text
               borderColor: "oklch(50.5% 0.213 147)",   // for Safar
              },
           })
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };




  const savePassword=async()=>{
    const {data,error}=await supabase.
          from("filoinfo")
          .update({password:usepass?keyPassword:null})
          .eq("id",docID)
    
    if(error){
      toast.error("Failed to save password")
      
    }else{
      toast.success("Password saved Successfully",{
         style: {
         background: "#16653466",  // green with transparency (similar opacity)
         color: "oklch(70.4% 0.191 142)",   // greenish text
         borderColor: "oklch(50.5% 0.213 147)",   // for Safar
         },
      })
      
    }
    
    

  }



  if(Loading){
    return (
      <>
      <AlertMessage/>
      <div>Loading...</div></>
    )
  }

  const isImage=fileInfo.file_type?.startsWith('image/')
  const isPDF = fileInfo.file_type === 'application/pdf';

  


  





  return (<>
    <AlertMessage/>
  
    <div className="p-6 space-y-10 text-gray-400">
      
      {/* Back Button */}
      <div className="flex items-center text-neutral-100 gap-2 text-sm font-semibold">
        <Link href="/upload" className="hover:text-gray-400 ">
          <CircleArrowLeft className="size-5" />
        </Link>
        <div className="">Go to Upload</div>
      </div>

      {/* Layout */}
      <div className="flex flex-col md:flex-row justify-between gap-8 ">
        {/* Placeholder for Preview */}
        <div className="border rounded-lg  md:w-[40%] h-70 bg-neutral-800 flex items-center justify-center relative ">

          {isImage ? (<img src={fileInfo.file_url} alt="file preview" className="max-w-full max-h-full absolute top-0 rounded-lg select-none " />):
            isPDF?(<iframe src={fileInfo.file_url} className="w-full h-120 rounded-lg absolute top-0 select-none" frameBorder="0" />):
              (<img src="/files.svg" alt="File Preview" className="max-w-20 max-h-[20vh] rounded-lg top-0 select-none " />)
          }
          
        </div>

        {/* File Info + Password */}
        <div className="space-y-4 md:w-[50%]">
          {/* Short URL */}
          <div className="space-y-1">
            <label htmlFor="ShortUrlHolder" className="block text-sm font-semibold">
              Short URL
            </label>
            <div className="flex items-center space-x-2 rounded-lg p-1">
            <Input
              type="text"
              name="ShortUrlHolder"
              value={fileInfo.short_url}
              
              readOnly
              className=" text-gray-400/60"
            />
            <Button onClick={handleCopy} className="p-1 bg-green-500 hover:bg-green-600 text-neutral-900  transition">
              <Copy size={20} />
            </Button>
            </div>


          </div>

          {/* Enable Password */}
          <div className="flex items-center gap-2">
            <input type="checkbox" id="EnablePass" name="EnablePass" defaultChecked={usepass} onClick={()=>{setusepass(!usepass)}}  />
            <label htmlFor="EnablePass" >Enable Password?</label>
          </div>

          {/* Password Input */}
          {usepass?<div className="space-y-1 ">
            <label htmlFor="Password" className="block text-sm font-medium">
              Enter Password
            </label>
            <div className="flex gap-2"><Input type="password" name="Password" value={keyPassword}  onChange={(e)=>{setkeyPassword(e.target.value)}}  className="bg-white text-gray-400/60" />
            <Button onClick={()=>{savePassword()}} className={"bg-green-500 hover:bg-green-600"}>Save</Button></div>
          </div>:null}

          {/* Email Input */}
          <div className="space-y-1 border-1 p-3 rounded-sm">
            <label htmlFor="maili" className="block text-sm font-medium">
              Email
            </label>
            <Input type="email" name="maili" className="bg-white text-gray-400/60" placeholder="example@gmail.com" />
            <Button className={"mt-1 w-[100%] bg-green-500 hover:bg-green-600"}>Send Email</Button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default FilePreviewClient;
