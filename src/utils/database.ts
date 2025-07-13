import { SQL } from "bun";

export const db = new SQL({
  hostname: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  database: process.env.PG_DB,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
})


export const connectDB = async (retries:number,delay:number) => {
  for (let i = 0; i < retries; i++) {
    try {
      await db.connect();
      return;
    } 
    catch (e) {
      console.error(`DB connection failed (${i + 1}):\n`, e);
      if (i < retries - 1) {
        await new Promise(res => setTimeout(res, delay * Math.pow(2, i)));
        //stop loop of expo amount of delay time
      }
       else {
        throw new Error("could not connect to the DB after multiple");
      }
    }
  }
}

export const query = async (state:TemplateStringsArray,params?:any[]) =>{
  try{
    return await db(state,...params ?? []);
  }
  catch(e:any){
    if (e.message.includes("disconnected") || e.code === "ECONNRESET") {
      console.error("DB disconnected while querying, trying to reconnect");
      await connectDB(5, 2000); 
      return await db(state,...params ?? []); 
  }
  throw e;
  }
}