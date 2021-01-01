import * as React from 'react'
import { eel } from '../eel.js'
import { AppContext } from 'components/appContextProvider'
import { NavSelector } from 'components/navSelector'
import { StageSelector } from 'components/stages'
export const Commands: React.FC = function (props) {
    return (<>
        <Console></Console>
        <StageSelector />
        <CommandSelector></CommandSelector>
        <CommandList></CommandList>
    </>)
}

const Console: React.FC = function () {
    const { state } = React.useContext(AppContext)
    const onPlay = () => eel.play(state.current_stage, state.current_command)
    const onStop = () => eel.stop()
    return <div className="my-2">
        <button className="btn btn-outline-primary mr-2" onClick={onPlay}>
            <i className="fas fa-play"></i>
        </button>
        <button className="btn btn-outline-primary mr-2" onClick={onStop}>
            <i className="fas fa-stop"></i>
        </button>
    </div>
}

const CommandSelector: React.FC = function () {
    const { state, dispatcher } = React.useContext(AppContext)
    const labels = state.stages[state.current_stage].commands.map((c, i) => String(i))
    const setValue = (i: number) => dispatcher({ type: "setCurrentCommand", value: i })
    const currentValue = state.current_command
    const props = { labels, currentValue, setValue }
    return <NavSelector {...props} />
}

const CommandList: React.FC = function () {
    const { state } = React.useContext(AppContext)

    const command = state.stages[state.current_stage].commands[state.current_command]

    const rows = command.map((line, i) => {
        const key = "command-" + state.current_stage +
            '-' + state.current_command +
            '-' + i

        return <CommandListRow key={key} line_no={i} >{line}</CommandListRow>
    })

    return <table className="table table-sm">
        <tbody>
            {rows}
        </tbody>
    </table>
}

const CommandListRow: React.FC<{ children: JSX.Element | string, line_no: number }> = function (props) {
    const { state } = React.useContext(AppContext)
    const className = (state.current_line == props.line_no) ? 'table-active' : ''

    return (<tr className={className} >
        <td className='text-right' style={{ width: '2rem' }}>
            {props.line_no}
        </td>
        <td>
            {props.children}
        </td>
    </tr>)

}