"use client"
import React, { useEffect, useState } from 'react'
import { Rabbit } from 'lucide-react'
import AlertMessage from '@/app/(dashboard)/_components/AlertMessage'
import { Button } from '@/components/ui/button'
import { Copy,Check } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/utils/supabase/client'


import { useSearchParams } from 'next/navigation'

const FiloPadFileViewer = ({short_url_id}) => {
    const searchParams = useSearchParams()
    
    const [text, settext] = useState("")
    const [copied, setCopied] = useState(null)


    useEffect(() => {
        const fetchData=async()=>{
          const DOCID=searchParams.get('docID')

          
          const {data,error}=await supabase
              .from('filopadinfo')
              .select('*')
              .eq('id',DOCID)
              .single();
    
          if(error){
            console.log("error occured in FileViewer in fetchData ",error.message);
            toast("Something went Wrong")
            return;
          }
          const URL=data.file_url;
          try {
               const res = await fetch(URL);

               if (!res.ok) {
                toast("Something Went Wrong")
               }

               const textData = await res.text();
               settext(textData);
        } catch (error) {
             console.error("Error fetching file:", error);
             toast.error("Something Went Wrong");
        }
        //   console.log(data);
          
          
        }
        fetchData();
        
      }, [short_url_id])

    const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 sec
      toast.success("Copied to Clipboard",{
               style: {
               background: "#16653466",  // green with transparency (similar opacity)
               color: "oklch(70.4% 0.191 142)",   // greenish text
               borderColor: "oklch(50.5% 0.213 147)",   // for Safar
              },
      })
    } catch (err) {
      console.error('Failed to copy: ', err);

    }
  };





  return (
    <>

    <div className='flex justify-center items-center flex-col gap-2 min-h-svh'>
        
        <div className="flex items-center gap-2 self-center font-medium">
                <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                  <Rabbit className="size-4" />
                </div>
                Filo Inc.
        </div>


    <div className=" bg-neutral-900 flex items-center justify-center px-4  lg:w-[45vw] w-[90vw] md:w-[70vw]">
        <AlertMessage/>
      <div className="w-full max-w-3xl rounded-2xl bg-neutral-800 border-1 rounded-sm  border-neutral-700 shadow-xl p-8 space-y-6">
        
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-green-500">FiloPad</h1>
          <p className="text-gray-400 text-sm mt-1">
            Paste your code, text, or notes — share them instantly.
          </p>
        </div>

        {/* Custom Textarea */}
        <textarea
        readOnly
        //   className="w-full h-64 resize-none bg-neutral-900 border border-green-500 text-neutral-100 placeholder:text-gray-500 p-4 rounded-lg font-mono text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          className="w-full h-64 resize-none bg-neutral-900 border border-green-500 text-gray-500  placeholder:text-gray-500 p-4 rounded-sm font-mono text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500 transition
    scrollbar-thin scrollbar-track-neutral-800 scrollbar-thumb-green-500 hover:scrollbar-thumb-green-600"
        placeholder="// Shared Text Will be Shown Here. Loading..."
          value={text}
        />

        <Button className="w-full bg-green-500 hover:bg-green-600 flex item-center justify-center"  onClick={handleCopy}>
            {copied ? <Check className=" w-4 h-4" /> : <Copy className="w-4 h-4" />}
            Copy</Button>
        </div>
        </div>
        </div>
        </>
  )
}

export default FiloPadFileViewer