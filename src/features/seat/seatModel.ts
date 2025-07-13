import { query } from "../../utils/database"

export const queryAllSeat = async () =>{
    
    return await query([`SELECT * FROM "floor2SIT"`])
}