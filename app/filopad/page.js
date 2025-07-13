'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy,Check } from 'lucide-react';
import AlertMessage from '../(dashboard)/_components/AlertMessage';
import { toast } from 'sonner';
import { supabase } from '@/utils/supabase/client';
import { generateRandomString } from '../(dashboard)/_components/GenerateRandomString';
import { Rabbit } from 'lucide-react';


export default function FilopadPage() {
  const [text, setText] = useState('');
  const [shortUrl, setShortUrl] = useState(null);
  const [copied, setCopied] = useState(false);
  const [FileUrl, setFileUrl] = useState(null)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
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


  const saveInfo = async (file, fileUrl) => {
      const DOCID=Date.now().toString();
      const RandString=generateRandomString();
    //   const cleanFileName = file.name.replace(/\s+/g, '_');
  
      const { error } = await supabase
        .from('filopadinfo')
        .insert([
          {
            file_name: file?.name,
            file_url: fileUrl,
            id: DOCID,
            short_url: process.env.NEXT_PUBLIC_BASE_URL+"filopad/view/" + RandString+"?docID="+DOCID,
            created_at: new Date().toISOString(),
          },
        ]);

        setShortUrl(process.env.NEXT_PUBLIC_BASE_URL+"filopad/view/" + RandString+"?docID="+DOCID);
  
      if (error) {
        console.error('Supabase insert error:', error);
        return false;
      }
  
      return true;
    };
  
    const uploadFile = async () => {
      try {

        const filename = `filopad-${Date.now()}.txt`;
        const file = new File([text], filename, { type: 'text/plain' });
        

        const { data, error } = await supabase.storage
            .from('uploadfilopad') // your bucket name
            .upload(`texts/${filename}`, file, {
             cacheControl: '3600',
             upsert: false,
        });

    if (error) {
      console.error('Upload failed:', error.message);
      return false;
    }

    const publicUrl = supabase.storage
      .from('uploadfilopad')
      .getPublicUrl(`texts/${filename}`).data.publicUrl;

      setFileUrl(publicUrl);
        
          
  
          
        const res = await saveInfo(file,publicUrl);
        console.log(res);
        
        if(!res)  return false;
  
        // router.push(`/file-preview/${res.RandString}?docID=${res.DOCID}`)
  
        return true;
  
  
  
      } catch (err) {
        console.error('Unexpected error during upload:', err);
        return false;
      }
    };

const getTextSizeInBytes = (text) => {
  const encoder = new TextEncoder();
  return encoder.encode(text).length;
};

const getTextSizeInMB = (texxt) => {
  const bytes = getTextSizeInBytes(texxt);
  return (bytes/(1024*1024)).toFixed(2);// Convert to MB
};



  const handleSubmit = async () => {
    if(getTextSizeInMB(text)>2){
        toast("Pasted text exceeds the 2MB limit. Upgrade your plan to support larger pastes.")
        return;
    }
    
    const res= await uploadFile();
    if(!res){
        toast("Something Went Wrong");
        return;
    }

    
  };

  return (
    <div className='flex justify-center items-center flex-col gap-2 min-h-svh'>
        <div className="flex items-center gap-2 self-center font-medium">
                <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                  <Rabbit className="size-4" />
                </div>
                Filo Inc.
        </div>


    <div className=" bg-neutral-900 flex items-center justify-center px-4 lg:w-[45vw] w-[90vw] md:w-[70vw]">
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
        //   className="w-full h-64 resize-none bg-neutral-900 border border-green-500 text-neutral-100 placeholder:text-gray-500 p-4 rounded-lg font-mono text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          className="w-full h-64 resize-none bg-neutral-900 border border-green-500 text-gray-500  placeholder:text-gray-500 p-4 rounded-sm font-mono text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500 transition
    scrollbar-thin scrollbar-track-neutral-800 scrollbar-thumb-green-500 hover:scrollbar-thumb-green-600"
        placeholder="// write or paste something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Generate Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            className="bg-green-500 text-neutral-900 hover:bg-green-600 transition font-semibold px-6 py-2 rounded-md shadow-md"
          >
            Generate Short URL
          </Button>
        </div>

        {/* Output URL */}
        {shortUrl && (
          <div className="bg-neutral-900 border border-green-600 p-4 rounded-lg text-center">
            <p className="text-gray-400 text-sm mb-1">Here’s your link:</p>
            <div className='flex gap-2'>
                <Input
              readOnly
              value={shortUrl}
              className="text-center font-mono text-neutral-100 bg-neutral-800 border border-green-500"
            /><Button onClick={handleCopy}  className='bg-green-500 text-neutral-900 hover:bg-green-600 transition font-semibold px-6 py-2 rounded-md shadow-md'>{copied ? <Check className=" w-4 h-4" /> : <Copy className="w-4 h-4" />}</Button>
            </div>
          </div>
        )}
      </div> 
    </div>
    </div>
  );
}
