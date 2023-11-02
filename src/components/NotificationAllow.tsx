import { PopUpContainer, Button } from '../components'
import { Bell } from "lucide-react";
export function NotificationAllow() {
  async function acceptNotification() {
    if (!("Notification" in window))
      alert("Browser Doesn't support Notifications")
    else
      await Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("you will be updated with what's happing")
        }
      })
  }
  return (
    <PopUpContainer show={true}>
      <div className='w-full flex flex-col'>
        <Bell className=' w-14 h-14 text-secondary self-center mb-14' />
        <h2 className=' text-primary font-bold text-2xl mb-1'>Turn on notification</h2>
        <p className=' text-gray mb-3'>Get the most out of Qwitter by staying up to date with what's happening</p>
        <Button className='my-4 py-6 ' onClick={acceptNotification}>Allow notification</Button>
        <Button variant="outline" className='py-6'>Skip for now</Button> {/*Move to next state*/}
      </div>
    </PopUpContainer>
  )
}

