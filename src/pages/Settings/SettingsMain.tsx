import { AccountInformation, YourAccount } from '@/components'
import { SettingsOptions } from '../../components/SettingsOptions/SettingsOptions'
import { CheckPassword } from '@/components/CheckPassword/CheckPassword'


export function SettingsMain() {
    return (
        <div className=' border-l-[0.5px] border-primary border-opacity-30 '>
            <div className='w-auto xl:w-[920px] h-full flex flex-row large2X:w-[990px] max-largeX:max-w-[600px] flex-shrink-1 flex-grow-2'>
                <div className="max-w-[600px] w-1/2 h-full border-r border-primary border-opacity-30 max-largeX:hidden">
                <SettingsOptions />
                </div>
                <div className='max-w-[600px] w-full mx-auto h-full'>
                    <YourAccount  />
                </div>
            </div>
        </div>
    )
}
