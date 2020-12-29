import * as React from 'react'

export function App() {
    return <>
        <Header></Header>
     'this is app'
    </>
}

function Header() {
    return <header className='bg-primary text-white'>
        <div className='container'>
            <h1>PyAutoFgo04</h1>
        </div>
    </header>
}