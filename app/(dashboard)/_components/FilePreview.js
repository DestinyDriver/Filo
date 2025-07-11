
import React from 'react'
import { File ,CircleX} from 'lucide-react'

const FilePreview = ({file,RemoveFile}) => {
    
  return (
    <div className="relative flex items-center justify-between w-[73%] py-8 px-4 border rounded-sm mb-8">
  {/* Cross Button in top-right */}
  <button
    type="button"
    className="absolute top-2 right-2 text-red-500 p-2 rounded hover:opacity-80 cursor-pointer" onClick={()=>{RemoveFile();}}
  >
    <CircleX className="w-4 h-4" />
  </button>

  {/* File Info Section */}
  <div className="flex items-center space-x-3">
    <div className="bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 p-3 rounded">
      <File />
    </div>

    <div className='text-left'>
      <div>{file?.name}</div>
      <div className="text-sm text-gray-500">{file?.type}</div>
      <div className="text-sm text-gray-500">
        {(file?.size / (1024 * 1024)).toFixed(2)} MB
      </div>
    </div>
  </div>
</div>

  )
}

export default FilePreview