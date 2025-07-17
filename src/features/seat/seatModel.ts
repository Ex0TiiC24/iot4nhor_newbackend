import { query } from "../../utils/database"

export const queryAllSeat = async () =>{
    const result = await query`SELECT * FROM "floor2SIT"
ORDER BY id DESC LIMIT 500;`
    return result
}