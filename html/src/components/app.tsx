import * as React from 'react'
import { eel } from '../eel.js'

import { AppContextProvider, AppContext } from 'components/appContextProvider'
import { PagedBody } from 'components/pagedBody'

export function App(): JSX.Element {
    return <AppContextProvider>
        <AppMain />
    </AppContextProvider>
}

let logListener = []
eel.expose(log)
function log(msg) {
    console.log(msg)
    logListener.forEach((l) => l(msg))
}

function AppMain(): JSX.Element {
    const { state, dispatcher } = React.useContext(AppContext)
    const isStageInitialized = React.useRef<boolean>(false)

    //オブジェクト生成時にログ読み込み
    React.useEffect(() => {
        const listener = (msg) => dispatcher({ type: 'addLog', value: msg })
        logListener.push(listener)
        return () => {
            logListener = logListener.filter(l => (l !== listener));
        }
    })

    //アプリ開始時に一回だけステージ情報を読み込む
    if (!isStageInitialized.current) {
        eel.get_stages()(stages => dispatcher({ type: 'setStages', value: stages }))
        isStageInitialized.current = true
    }

    return (<>
        <Header></Header>
        <PagedBody></PagedBody>
    </>)
}
function Header(): JSX.Element {
    return <header className='bg-primary text-white'>
        <div className='container'>
            <h1>PyAutoFgo04</h1>
        </div>
    </header>
}
