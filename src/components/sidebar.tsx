import { Panel } from "@/pages"
import { AccountPermission } from "@/types/backend"
import { Dispatch, SetStateAction } from "react"
import SidebarItem from "./sidebarItem"

type SidebarProps = {
    permission: AccountPermission
    activePanel: Panel
    setActivePanel: Dispatch<SetStateAction<Panel>>
}

// TODO: Highlight the active panel

export default function Sidebar({ permission, activePanel, setActivePanel }: SidebarProps) {
    return (
        <div style={{'width': '200px', 'borderRight': '1px solid white'}}>
            <SidebarItem thisPanel={Panel.MY_COURSES} activePanel={activePanel} setActivePanel={setActivePanel}/>

            {[AccountPermission.TA, AccountPermission.TEACHER, AccountPermission.ADMIN].includes(permission) && 
                <SidebarItem thisPanel={Panel.CREATE_COURSE} activePanel={activePanel} setActivePanel={setActivePanel}/>
            }

            {permission === AccountPermission.ADMIN && 
            <SidebarItem thisPanel={Panel.ALL_COURSES} activePanel={activePanel} setActivePanel={setActivePanel}/>
            }
        </div>
    )
}