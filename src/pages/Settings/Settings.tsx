import {NavBar,SettingsMain} from '../../components'
import temp from '../../assets/temp.png'

export function Settings() {
    return (
        <div className='w-full flex flex-row min-h-[750px] z-0 justify-center'>
            <NavBar userName='MarwanSamy' name="XLV" profilePic={temp} />{/*till we know how the roots will work */}
            <SettingsMain />
        </div>
    )
}