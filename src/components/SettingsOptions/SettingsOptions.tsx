import { useState } from 'react'
import {settingsOptions} from '../../constants'
import { ChevronRight } from 'lucide-react'
type Props = {}

export function SettingsOptions (props: Props)  {
  const [active, setActive] = useState("")

  return (
    <div className="max-w-[600px] w-full h-full border-r border-primary border-opacity-30">
      <div className="h-14 p-4 mb-2">
        <h1 className="text-primary text-xl font-bold text-start ">Settings</h1>
      </div>
        <Options active={active} setActive={setActive} />
    </div>
  )
}
function Options({ active, setActive }:{active:string,setActive:React.Dispatch<React.SetStateAction<string>>}) {
  return (
      <ul className='flex flex-col w-full'>
          {settingsOptions.map((link) => (
              <a href={`#${link.title}`} key={link.id} className='group' onClick={() => setActive(link.title)}>
                  <div className={active == link.title ? 'flex flex-row py-3 px-4 items-center justify-between bg-[#191919]  transition-all border-r-[3px] border-secondary ' :'flex flex-row py-3 px-4 items-center justify-between group-hover:bg-[#191919]  transition-all '}>
                      <li className='text-base text-primary' >
                          {link.title}
                      </li>
                      <ChevronRight color='grey' />
                  </div>
              </a>
          ))}
      </ul>
  )
}