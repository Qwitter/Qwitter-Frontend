import {  Button } from "../";
import { Bell } from "lucide-react";
type NotificationAllowProps = {
nextStep: () => void;
  
};
export function NotificationAllow({nextStep}:NotificationAllowProps) {
  async function acceptNotification() {
    if (!("Notification" in window))
      alert("Browser Doesn't support Notifications");
    else
      await Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("you will be updated with what's happing");
        }
        nextStep()
      });
  }
  return (
      <div className="w-full flex flex-col justify-center h-[90%]">
        <Bell className=" w-14 h-14 text-secondary self-center mb-20" />
        <h2 className=" text-primary font-bold text-2xl mb-1">
          Turn on notification
        </h2>
        <p className=" text-gray mb-3">
          Get the most out of Qwitter by staying up to date with what's
          happening
        </p>
        <Button className="my-6 py-3 " onClick={acceptNotification}>
          Allow notification
        </Button>
        <Button variant="outline" className="py-3" onClick={()=>nextStep()}>
          Skip for now
        </Button>

      </div>
  );
}
