
import {Icon} from "@iconify/react"
interface IconifyProps {
    icon:string,
    width?:number,
    height?:number,
    className?:string,
    color?:string,
    backgroundColor?:string,
    onClick?:()=>void
}
export const Iconify=({icon, width, height, className, color,backgroundColor, onClick }:IconifyProps)=>{
    return <Icon icon={icon} width={width??24} height={height??24} className={className??""} color={color??""} 
    style={{backgroundColor:backgroundColor??""}} onClick={onClick} />
}