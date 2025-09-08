import axios from "axios"
import { toast } from "react-toastify"

export const a = axios.create({
    baseURL:"http://localhost:3001",
    timeout: 2000
})

export const apiController = {
    getHeaders(){
       let headers:any = {
            "Content-Type":"	application/json; charset=utf-8"
        }
        const token = localStorage.getItem("token")
        if(token){

            headers = {
                ...headers,
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        }
        return headers
    },
    async get(url:string){
         try {
            const res = await a.get(url,{
                headers:this.getHeaders()
            })
            if(res.data){
                return res.data
            }
         } catch (error) {
           
         }
    },
    async post(url:string,body:any){
         try {
            const res = await a.post(url,body,{
                headers:this.getHeaders()
            })
            if(res.data){
                return res.data
            }
         } catch (error:any) {
        
            toast.error(error.response.data.message);
         }
    },
    async patch(url:string, body:any){
        try{
            const res = await a.patch(url,body,{
                headers:this.getHeaders()
            })
            if(res.data){
                return res.data
            }

        }catch(error:any){
          
            toast.error(error.response.data.message)
        }
    },
    async delete(url:string){
        try{
            await a.delete(url, {
                headers: this.getHeaders()
            })
        }catch(error:any){
       
        toast.error(error.response.data.message)
    }
    }
}