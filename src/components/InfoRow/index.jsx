import React from 'react'

export const InfoRow = ({ label, value }) => {
  return (
    <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="font-medium text-gray-900 text-lg">{label}</dt>
        <dd className="mt-1 text-gray-700 sm:col-span-2 sm:mt-0 text-lg">{value}</dd>
    </div>
  )
}
