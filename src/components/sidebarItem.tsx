import { Panel } from "@/pages"
import { SIDEBAR_BUTTON_S } from "@/styles/styles"
import { Dispatch, SetStateAction } from "react"

type SidebarItemProps = {
    thisPanel: Panel
    activePanel: Panel
    setActivePanel: Dispatch<SetStateAction<Panel>>
}
export default function SidebarItem({thisPanel, activePanel, setActivePanel}: SidebarItemProps) {
    return (
        <button onClick={()=>setActivePanel(thisPanel)} style={SIDEBAR_BUTTON_S}>
            {thisPanel}
        </button>
    )
}