export interface modalProps {
    isOpen:true|false,
    campoId?: number|null,
    onClose?: () => void,
    classname?:string
}