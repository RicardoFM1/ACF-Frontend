import { toast } from "react-toastify";
export const getLocalStorageItem = (itemName:string) => {
    const item = localStorage.getItem(`${itemName}`)
    return item
}

export const setLocalStorageToken = ( itemData:any) => {
    localStorage.setItem(`token`, itemData)
}

export const removeLocalStorageItem = (itemName:any) => {
    localStorage.removeItem(`${itemName}`)
}

export const toastbar={
    success:(message:string)=>{
        toast.success(message)
    },
    error:(message:string)=>{
        toast.error(message)
    }
}