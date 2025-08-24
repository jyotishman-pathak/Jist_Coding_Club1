import { eventSchema } from "@/lib/validation";

import { NextRequest } from "next/server";

import prisma from "@/lib/prisma";



export async function POST(request: NextRequest){
   
   
   try{
    const body = await request.json();

    const result = eventSchema.safeParse(body.data)

    if(!result.success){
        return new Response(
          JSON.stringify({ errors: result.error }),
        { status: 400 }
        )


    }

    const validData = result.data;

    console.log("validated data" , validData);


    const newEvent = await prisma.events.create({
        data: validData
    })
       return new Response(JSON.stringify(newEvent), { status: 200 });

   
   } catch (error) {
    console.error("Error saving project:", error);
    return new Response("Failed to save project", { status: 500 });
  }
}
  
export async function GET(request: NextRequest) {
    
try{
    const projects = await prisma.events.findMany({
        orderBy: {createdAt: "desc"}
    })
    return new Response(JSON.stringify(projects), {status: 200})

}catch(error){
console.log(error)
return new Response("failed to Fetch the project" , {status:500})
}

}



