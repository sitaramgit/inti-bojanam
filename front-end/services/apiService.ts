import axios from "axios";
import { IApiService } from "../common/interface"
import { apiEndPoints } from "../common/apiEndPoints";


export const apiService = async (request: IApiService) => {

    const httpRequest: any =  {
        POST: async (postRequest: IApiService) => {
            try {
                const response = await axios.post(`${apiEndPoints.host_api.host}${postRequest.URL}`, postRequest.PAYLOAD);
                return response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        GET: async (getRequest: IApiService) => {
            try {
                const response = await axios.get(`${apiEndPoints.host_api.host}${getRequest.URL}`);
                return response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        DELETE: async (deleteRequest: IApiService) => {
            try {
                const response = await axios.delete(`${apiEndPoints.host_api.host}${deleteRequest.URL}`);
                return response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        PATCH: async (patchRequest: IApiService) => {
            try {
                const response = await axios.patch(`${apiEndPoints.host_api.host}${patchRequest.URL}`, patchRequest.PAYLOAD);
                return response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
    };

    if (httpRequest[request.METHOD]) {
        return await httpRequest[request.METHOD](request);
    } else {
        throw new Error(`Unsupported request method: ${request.METHOD}`);
    }
    // return request; 

}
