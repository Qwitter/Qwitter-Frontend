import React from 'react'
import { SettingsOptions } from './SettingsOptions/SettingsOptions'
import { ChangeUsername } from './'
import { RestPassword } from './RestPassword'

type Props = {}

export function SettingsMain(props: Props) {
    return (
        <div className=' border-l-[0.5px] border-primary border-opacity-30 '>
            <div className='w-[990px] h-full flex flex-row max-large2X:w-[920px] max-largeX:max-w-[600px] flex-shrink-1 flex-grow-2'>
                <div className="max-w-[600px] w-1/2 h-full border-r border-primary border-opacity-30 max-largeX:hidden">
                <SettingsOptions />
                </div>
                <div className='max-w-[600px] w-full mx-auto h-full'>
                    <RestPassword userName='marwanSamy' />
                </div>
            </div>
        </div>
    )
}
