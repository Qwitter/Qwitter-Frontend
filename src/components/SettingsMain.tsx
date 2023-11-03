import React from 'react'
import { SettingsOptions } from './SettingsOptions/SettingsOptions'

type Props = {}

export function SettingsMain(props: Props) {
    return (
        <div className='w-[990px] border-r-[0.5px] border-l-[0.5px] border-primary border-opacity-30 '>
            <SettingsOptions />
        </div>
    )
}
