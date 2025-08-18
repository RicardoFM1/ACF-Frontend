export const getLocalStorageItem = (itemName:string) => {
    const token = localStorage.getItem(`${itemName}`)
    return token
}

export const setLocalStorageItem = (itemName:string, itemData:any) => {
    localStorage.setItem(`${itemName}`, itemData)
}

export const removeLocalStorageItem = (itemName:any) => {
    localStorage.removeItem(`${itemName}`)
}