import * as React from 'react'
import { eel } from '../eel.js'

import { AppContextProvider, AppContext } from 'components/appContextProvider'
import { PagedBody } from 'components/pagedBody'

export function App(): JSX.Element {
    return <AppContextProvider>
        <AppMain />
    </AppContextProvider>
}

//eel関係の受けはdocumentのEventとして処理する
const PYAUTOFGO_LOG = 'pyautofgo-log';
let logListener = []
eel.expose(log)
function log(msg: string): void {
    const event = new CustomEvent(PYAUTOFGO_LOG, { detail: msg });
    document.dispatchEvent(event);
}

const PYAUTOFGO_SET_POS = 'pyautofgo-set-pos'
eel.expose(set_pos)
function set_pos(stage_no: number, cmd_no: number, line_no: number): void {
    const event = new CustomEvent(PYAUTOFGO_SET_POS, { detail: [stage_no, cmd_no, line_no] });
    document.dispatchEvent(event);
}

const PYAUTOFGO_PLAY_END = 'pyautofgo-play-end'
eel.expose(play_end)
function play_end(stage_no: number, cmd_no: number): void {
    const event = new CustomEvent(PYAUTOFGO_PLAY_END, { detail: [stage_no, cmd_no] });
    document.dispatchEvent(event)
}


function AppMain(): JSX.Element {
    const { state, dispatcher } = React.useContext(AppContext)
    const isStageInitialized = React.useRef<boolean>(false)

    //アプリ開始時に一回だけステージ情報を読み込む
    if (!isStageInitialized.current) {
        eel.get_stages()(stages => dispatcher({ type: 'setStages', value: stages }))
        isStageInitialized.current = true
    }
    //コンポーネント生成時にイベントリスナを仕込む
    React.useEffect(() => {
        const logListener = function (event) {
            dispatcher({ type: 'addLog', value: event.detail })
        }

        const setPosListener = function (event) {
            console.log("setpos called")
            dispatcher({ type: 'setPos', value: event.detail })
        }

        const playEndListener = function (event) {
            const [stage_no, cmd_no] = event.detail
            dispatcher({ type: 'setCurrentStage', value: stage_no })
            dispatcher({ type: 'setCurrentCommand', value: cmd_no })
            

        }

        document.addEventListener(PYAUTOFGO_LOG, logListener)
        document.addEventListener(PYAUTOFGO_SET_POS, setPosListener)
        document.addEventListener(PYAUTOFGO_PLAY_END, playEndListener)

        return () => {//コンポーネント破棄時にイベントリスナ除去
            document.removeEventListener(PYAUTOFGO_LOG, logListener)
            document.removeEventListener(PYAUTOFGO_SET_POS, setPosListener)
        }
    })


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
