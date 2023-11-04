import {NavBar,SettingsMain} from '../../components'
import temp from '../../assets/temp.png'
type Props = {}

export function Settings(props: Props) {
    return (
        <div className='w-full flex flex-row min-h-[750px] z-0 '>
            <NavBar userName='MarwanSamy' name="XLV" profilePic={temp} />
            <SettingsMain />
        </div>
    )
}