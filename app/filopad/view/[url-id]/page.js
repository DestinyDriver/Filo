import React from 'react'
import FiloPadFileViewer from '../_components/FiloPadFileViewer'

const page = ({params}) => {
  return (
    <FiloPadFileViewer short_url_id={params.url_id}/>
  )
}

export default page