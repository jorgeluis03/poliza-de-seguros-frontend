import React from 'react'

export const Header = ({currentTitle, bgHeader}) => {
    return (
        <header className={bgHeader}>
            <div className="container max-w-full mx-auto py-4">
                <h1 className="text-xl font-bold text-white">{currentTitle}</h1>
            </div>
        </header>
    )
}
