
interface LanguageIconProps {
  language: 'English' | 'French'
}

export function LanguageIcon({ language }: LanguageIconProps) {
  if (language === 'French') {
    return (
      <div className="flex items-center gap-1 text-sm text-gray-600" title="French">
        <div className="w-4 h-3 flex">
          <div className="w-1/3 bg-blue-600 rounded-l"></div>
          <div className="w-1/3 bg-white"></div>
          <div className="w-1/3 bg-red-600 rounded-r"></div>
        </div>
        <span className="text-xs">FR</span>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-1 text-sm text-gray-600" title="English">
      <div className="w-4 h-3 flex relative">
        <div className="w-full h-full bg-blue-600 rounded"></div>
        <div className="absolute inset-0 flex">
          <div className="w-full h-0.5 bg-white absolute top-0"></div>
          <div className="w-full h-0.5 bg-red-600 absolute top-0.5"></div>
          <div className="w-full h-0.5 bg-white absolute top-1"></div>
          <div className="w-full h-0.5 bg-red-600 absolute top-1.5"></div>
          <div className="w-full h-0.5 bg-white absolute top-2"></div>
          <div className="w-full h-0.5 bg-red-600 absolute bottom-0"></div>
        </div>
        <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-blue-800 flex items-center justify-center">
          <div className="w-1 h-0.5 bg-white transform rotate-45 absolute"></div>
          <div className="w-0.5 h-1 bg-white transform rotate-45 absolute"></div>
          <div className="w-1 h-0.5 bg-white transform -rotate-45 absolute"></div>
          <div className="w-0.5 h-1 bg-white transform -rotate-45 absolute"></div>
        </div>
      </div>
      <span className="text-xs">EN</span>
    </div>
  )
}
