import Elysia, { t } from "elysia"
import { getAllSeat } from "./seatService"


export const seatController = new Elysia()
.group('/api/seat', (app) =>
    app
        .get("allseat",getAllSeat())
        

    )
