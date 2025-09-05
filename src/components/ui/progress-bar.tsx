'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  step?: 1 | 2
  className?: string
  showStepButtons?: boolean
  onStepChange?: (step: 1 | 2) => void
}

export default function ProgressBar({ 
  step = 1, 
  className,
}: ProgressBarProps) {
  const progress = step === 1 ? 50 : 100
  

  return (
    <div className={cn("w-full space-y-4", className)}>
               {/* Progress Text */}
      <div className="flex items-center justify-center text-sm text-gray-600">
      {step}/2
      </div>
      {/* Progress Bar Container */}
      <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        {/* Progress Fill */}
        <div 
          className="h-full bg-gradient-to-r from-[#1082ff] to-[#1082ff] rounded-full transition-all duration-700 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>

    </div>
  )
}
