'use client'

import React, { useState } from 'react'
import ProgressBar from '@/components/ui/progress-bar'

export default function ProgressDemoPage() {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1)
  
  const handleNextStep = () => {
    setCurrentStep(currentStep === 1 ? 2 : 1)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Progress Bar Demo
          </h1>
          <p className="text-gray-600">
            2단계 진행 바 - Step 1 (50%) → Step 2 (100%)
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg space-y-8">
          {/* 기본 진행 바 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">기본 진행 바</h2>
            <ProgressBar step={currentStep} />
          </div>

          {/* 버튼이 포함된 진행 바 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">제어 버튼 포함</h2>
            <ProgressBar 
              step={currentStep} 
              showStepButtons 
              onStepChange={setCurrentStep}
            />
          </div>

          {/* 외부 제어 버튼 */}
          <div className="text-center">
            <button
              onClick={handleNextStep}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              {currentStep === 1 ? 'Step 2로 이동 (100%)' : 'Step 1로 이동 (50%)'}
            </button>
          </div>

          {/* 현재 상태 표시 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">현재 상태:</h3>
            <p className="text-gray-700">
              단계: Step {currentStep} | 
              진행률: {currentStep === 1 ? '50%' : '100%'}
            </p>
          </div>
        </div>

        {/* 사용법 안내 */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">사용법</h2>
          <div className="space-y-3 text-gray-700">
            <div>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                {'<ProgressBar step={1} />'}
              </code>
              <p className="text-sm mt-1">기본 사용 (50% 진행)</p>
            </div>
            <div>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                {'<ProgressBar step={2} />'}
              </code>
              <p className="text-sm mt-1">완료 상태 (100% 진행)</p>
            </div>
            <div>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                {'<ProgressBar showStepButtons onStepChange={handleChange} />'}
              </code>
              <p className="text-sm mt-1">제어 버튼 포함 및 콜백 함수</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
