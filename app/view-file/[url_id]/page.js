import React from 'react'
import FileViewer from '../_components/FileViewer'

const page = ({params}) => {
  return (
    <FileViewer shortUrlId={params.url_id}></FileViewer>
    
  )
}

export default page