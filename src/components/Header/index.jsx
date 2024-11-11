import React from 'react'

export const Header = ({currentTitle, bgHeader}) => {
    return (
        <header class={bgHeader}>
            <div class="container max-w-full mx-auto py-4">
                <h1 class="text-xl font-bold text-white">{currentTitle}</h1>
            </div>
        </header>
    )
}
