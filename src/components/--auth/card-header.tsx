import React from "react"

const CardHeader = ({ label }: { label?: string }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">
        🔐 Appointege Auth
      </h2>
      <p className="text-center text-gray-600 mb-6">{label}</p>
    </div>
  )
}

export default CardHeader
