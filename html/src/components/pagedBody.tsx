import * as React from 'react'
import { NavSelector } from 'components/navSelector'
import { AppContext } from 'components/appContextProvider'
import { Home } from 'components/home'
import { Stages } from 'components/stages'

export function PagedBody(props): JSX.Element {
    const { state, dispatcher } = React.useContext(AppContext)
    const setPage = (p) => dispatcher({ type: 'setPage', value: p })

    const pages = [
        { label: 'Home', element: Home },
        { label: 'Stages', element: Stages },
        { label: 'Commands', element: Commands },
    ]

    const labels = pages.map(p => p.label)
    const Body = pages[state.page].element

    return <div className="container">
        <NavSelector labels={labels} currentValue={state.page} setValue={setPage}></NavSelector>
        <Body></Body>
    </div>

}

function Commands(): JSX.Element {
    return <div>Commands</div>
}