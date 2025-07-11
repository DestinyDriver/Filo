"use client";
import React, { useState } from "react";
import { Fira_Code } from "next/font/google";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ProgressBar from "./ProgressBar";
import FilePreview from "./FilePreview";
import AlertMessage from "./AlertMessage";



const firacode = Fira_Code({
  subsets: ["latin"],
  weight: ["400"],
});

const UploadForm = ({ uploadFile }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  function fileSelect(nfile) {
    if (nfile && nfile.size > 2097152) {
      toast.error("Maximum File Size Exceeded");
      setFile(null);
      return;
    }
    setFile(nfile);
    setShowProgress(false);
    setProgress(0);
  }

  function RemoveFile() {
    setFile(null);
    setShowProgress(false);
    setProgress(0);
  }

  async function handleUpload() {
    if (!file) return;

    setProgress(0);
    setShowProgress(true);

    let fakeProgress = 0;
    const progressInterval = setInterval(() => {
      fakeProgress += 10;
      setProgress(Math.min(fakeProgress, 95));
    }, 150);

    const success = await uploadFile(file); // parent function for actual upload
    clearInterval(progressInterval);

    if (success) {
      setProgress(100);
      toast.success("File is Uploaded Succesfully",{
         style: {
         background: "#16653466",  // green with transparency (similar opacity)
         color: "oklch(70.4% 0.191 142)",   // greenish text
         borderColor: "oklch(50.5% 0.213 147)",   // for Safar
        },
     })
    } else {
        toast.error("File Upload went Wrong");
      setProgress(0);
      setShowProgress(false);
    }
  }


  

  return (
    <>
      <AlertMessage />

      <div className="flex flex-col items-center text-center space-y-4">
        <div
          className={`${firacode.className} text-center flex-wrap align-center text-xl md:text-2xl lg:text-3xl px-4 py-4`}
        >
          Start{" "}
          <strong className="text-green-400 dark:text-green-600 text-2xl md:text-3xl lg:text-4xl">
            Uploading
          </strong>{" "}
          File and{" "}
          <strong className="text-green-500/90 dark:text-green-600 text-2xl md:text-3xl lg:text-4xl">
            Share
          </strong>{" "}
          it
        </div>

        <div className="flex items-center justify-center w-[75%] py-8 px-4 ">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-neutral-100 dark:bg-neutral-900 hover:bg-gray-200 dark:border-neutral-700 dark:hover:border-neutral-600 dark:hover:bg-neutral-800"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="text-center mb-2 text-sm text-gray-500 dark:text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p className="text-center text-xs text-gray-500 dark:text-gray-500">
                SVG, PNG, JPG, PDF or any other file (Max 2MB)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={(ev) => fileSelect(ev.target.files[0])}
            />
          </label>
        </div>

        {file ? <FilePreview file={file} RemoveFile={RemoveFile} /> : null}

        {showProgress && <ProgressBar progress={progress} />}

        <div>
          <Button
            onClick={handleUpload}
            disabled={!file}
            variant="outline"
            className={`px-8`}
          >
            Upload
          </Button>
        </div>
      </div>
    </>
  );
};

export default UploadForm;
