
import {Icon} from "@iconify/react"
interface IconifyProps {
    icon:string,
    width?:number,
    height?:number,
    className?:string,
    color?:string,
    backgroundColor?:string,
    onClick?:()=>void
    type?:string
}
export const Iconify=({icon, width, height, className, color,backgroundColor, onClick, type}:IconifyProps)=>{
    return <Icon icon={icon} width={width??24} height={height??24} className={className??""} color={color??""} 
    style={{backgroundColor:backgroundColor??""}} type={type} onClick={onClick} />
}