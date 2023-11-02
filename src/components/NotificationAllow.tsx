import React from 'react'
import {NotificationBell} from '../assets'
import { PopUpContainer,Button } from '../components'
import { Bell } from "lucide-react";

export function NotificationAllow() {
  return (
    <PopUpContainer show={true}>
      <div className='w-full flex flex-col'>
      <Bell className=' w-14 h-14 text-secondary self-center mb-14' />
      <h2 className=' text-primary font-bold text-2xl mb-1'>Turn on notification</h2>
      <p className=' text-gray mb-3'>Get the most out of x by staying up to date with what's happing</p>
      <Button className='my-4 py-6'>Allow notification</Button>
      <Button variant="outline" className='py-6'>Skip for now</Button>
      </div>
    </PopUpContainer>
  )
}

