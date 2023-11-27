import {NavBar,SettingsMain} from '../../components'

export function Settings() {
    return (
        <div className='w-full flex flex-row min-h-[750px] z-0 justify-center'>
            <NavBar  />{/*till we know how the roots will work */}
            <SettingsMain />
        </div>
    )
}