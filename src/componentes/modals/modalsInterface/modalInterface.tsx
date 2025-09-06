export interface modalProps {
    isOpen:true|false,
    campoId?: number|null,
    onClose?: () => void,
    onSelectCampo?: (id:number, infoCampo:iCampos) => void,
    onAtualizarHorarios?: () => void,
    classname?:string
}

export interface iCampos {
    id: number,
    nome: string,
    endereco: string,
    descricao: string,
    valor: number,
    imagem: string,
}

export interface iUser {
        id: number,
        email: string,
        admin: boolean
}