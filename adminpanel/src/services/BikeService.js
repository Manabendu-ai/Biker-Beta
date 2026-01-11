import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8080/api/bikes/";

export const addBike = async (bikeData, image) => {
    const formData = new FormData();
    formData.append('bike', JSON.stringify(bikeData));
    formData.append('file', image);

    try {
        const response = await axios.post(API_URL, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    
        if (response.status === 200 || response.status === 201) {
            console.log("Success:", response.data);
            toast.success("Bike added successfully!");
            return response.data; 
        } else {
            toast.error("Error Adding bike!");
        }
    } catch (e) {
        console.error("Error:", e);
        toast.error("Error Adding bike!");
        throw e;
    }
}