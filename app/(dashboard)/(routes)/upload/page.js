'use client';
import React, { useState } from 'react';
import UploadForm from '../../_components/UploadForm';
import { supabase } from '@/utils/supabase/client';
import { useUser } from '@clerk/nextjs';
import { generateRandomString } from '../../_components/GenerateRandomString';
import { useRouter } from 'next/navigation';

const UploadPage = () => {
  const { user } = useUser(); // ✅ Correctly extract the user
  const router=useRouter();
  
 

  const saveInfo = async (file, fileUrl) => {
    const DOCID=Date.now().toString();
    const RandString=generateRandomString();
    const cleanFileName = file.name.replace(/\s+/g, '_');

    const { error } = await supabase
      .from('filoinfo')
      .insert([
        {
          file_name: file?.name,
          file_size: file?.size,
          file_type: file?.type,
          file_url: fileUrl,
          user_email: user?.primaryEmailAddress?.emailAddress,
          user_name: user?.fullName,
          password: '', // if needed
          id: DOCID,
          short_url: process.env.NEXT_PUBLIC_BASE_URL+"view-file/" + RandString,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error('Supabase insert error:', error);
      return false;
    }

    return { DOCID, RandString };
  };

  const uploadFile = async (file) => {
    try {
      const { error: uploadError } = await supabase.storage
        .from('uploadfiles')
        .upload('filo/' + file.name, file);

      if (uploadError) {
        console.error('Upload failed:', uploadError.message);
        return false;
      }

      const { data, error } = supabase
       .storage
       .from('uploadfiles')
       .getPublicUrl('filo/'+file.name);

      const fileUrl = data.publicUrl;

      if(error){
        console.log("Something wrong");
        
      }
        

        
      const res = await saveInfo(file, fileUrl);
      console.log(res);
      
      if(!res)  return false;

      router.push(`/file-preview/${res.RandString}?docID=${res.DOCID}`)

      return true;



    } catch (err) {
      console.error('Unexpected error during upload:', err);
      return false;
    }
  };

  return <UploadForm uploadFile={uploadFile} />;
};

export default UploadPage;
