import React from 'react'
import { Progress } from '@/components/ui/progress'

const ProgressBar = ({progress}) => {
  return (
    <>
    <Progress value={progress} className="w-[60%]"></Progress>
    </>
  )
}

export default ProgressBar