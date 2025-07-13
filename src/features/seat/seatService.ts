import { queryAllSeat } from "./seatModel"
import * as response from "../../utils/response"

export const getAllSeat = async () =>{
    try{
        const result = await queryAllSeat()
        return response.success("getallseat",result)
    }
    catch(e) {
        console.error(e)
        return response.error("bad",[])
    }
}