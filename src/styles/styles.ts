import { CSSProperties } from "react"

// Postfix all with _S to symbolize "Style"
export const VIEW_COURSES_S = {'padding': '20px 40px', 'border': '3px solid white'}
export const BUTTON_S = {'border': '1px solid white', 'padding': '2px 10px', 'marginRight': '5px', 'marginBottom': '5px'}
export const NEW_ASSIGNMENT_S = {'fontSize': '30px', 'borderRadius': '20px', 'border': '1px solid white', 'padding': '2px 30px', 'marginBottom': '10px', 'display': 'inline-block'}
export const ASSIGNMENT_S = {'border': '1px solid white', 'minWidth': '100px', 'display': 'inline-block', 'padding': '2px 10px'}
export const TEXT_INPUT_S = {'color': 'black', 'margin': '10px 10px', 'display': 'block', 'flexGrow': 1, 'padding': '2px 4px'}
export const CENTER_S = `grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`
export const FORM_S: CSSProperties = {'flexWrap': 'nowrap', 'width': '400px', 'margin': 'auto', 'display': 'flex', 'flexDirection': 'column', 'alignItems': 'left', 'justifyContent': 'left'}
export const FORM_ITEM_CONTAINER: CSSProperties = {'display': 'flex', 'alignItems': 'center'}
export const SUBMIT_BUTTON_S: CSSProperties = {'fontSize': '30px', 'width': '100%', ...BUTTON_S, 'cursor': 'crosshair'}
export const SIDEBAR_BUTTON_S: CSSProperties = {"fontWeight": "bold", 'width': '200px', 'borderRight': '1px solid white', "display": "block", "borderBottom": "1px solid white"}