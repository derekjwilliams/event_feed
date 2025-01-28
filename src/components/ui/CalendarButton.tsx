import { useState } from 'react'
import { Calendar } from 'lucide-react'

export default function CalendarButton({
  calendarUrl,
}: {
  calendarUrl: string
}) {
  const [showAlert, setShowAlert] = useState(false)

  const handleClick = () => {
    setShowAlert(true)
  }

  const handleCloseAlert = () => {
    setShowAlert(false)
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        className="float-right bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
      >
        <Calendar className="h-5 w-5" />
      </button>

      {showAlert && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/50 dark:bg-black/70 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
            <p className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Copy the following calendar URL:
            </p>
            <p className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm font-mono break-all mb-4 text-gray-900 dark:text-gray-200">
              {calendarUrl}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(calendarUrl)
                  handleCloseAlert()
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-2 px-4 rounded dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-100"
              >
                Copy to Clipboard
              </button>
              <button
                onClick={handleCloseAlert}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
