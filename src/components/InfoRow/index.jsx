import React from 'react'

export const InfoRow = ({ label, value }) => {
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium text-gray-900">{label}</dt>
        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{value}</dd>
    </div>
  )
}
