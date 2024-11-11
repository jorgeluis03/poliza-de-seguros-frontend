import React from 'react'

export const TitleSection  = ({title,description}) => {
  return (
    <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{description}</p>
    </div>
  )
}
