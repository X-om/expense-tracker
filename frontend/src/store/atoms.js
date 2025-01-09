import axios from "axios";
import { atom, selector } from "recoil";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const userAtom = atom({
  key: "userAtom",
  default: selector({
    key: "userSelector",
    get: async () => {
        const token = localStorage.getItem('token');
        if(!token){
            throw new Error('No authentication token found');  
        }
        
        try{
            await new Promise((resolve) => setTimeout(resolve,1000))
            const response = await axios.get(`${backendUrl}/user/userinfo`,{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });

            if (!response.data) {
                throw new Error('No user data received');
            }

            return response.data;
        } catch(error){
            throw error; 
        }
    },
  }),
});

export const accountAtom = atom({
    key : "accountAtom",
    default : selector({
        key : "accountSelector",
        get : async () => {
            const token = localStorage.getItem("token");

            if(!token){
                throw new Error("No authentication token found");
            }

            try{
                const response = await axios.get(`${backendUrl}/account/currentinfo`,{
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                });

                if(!response.data){
                    throw new Error("No user data received");
                }

                return response.data;
            }catch(error){
                throw error;
            }
        }
    })
})