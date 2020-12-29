import * as React from 'react'
import { AppContextProvider, AppContext } from 'components/appContextProvider'

export function Home(props): JSX.Element {
    const { state, dispatcher } = React.useContext(AppContext)

    return (<>
        <textarea
            className='form-control bg-white'
            value={state.log}
            readOnly
            style={{ height: "20rem" }}
        />
    </>)
}