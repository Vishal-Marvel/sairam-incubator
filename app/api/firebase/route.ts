import { db } from "@/lib/db";
import { imageDb } from "@/lib/firebase";
import { getUser } from "@/lib/get-user";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";
import {v4} from "uuid"

export async function POST(req: NextRequest, res: NextResponse) {
    try {
      const headers = req.headers;
      const token = headers.get("Authorization");
      const user = await getUser(token);
      if (!user) {
        return new NextResponse("User Not Found", { status: 404 });
      }
      const data  = await req.formData();
      const image = data.get("image");
      if (!image) {
        return new NextResponse("Image is missing", { status: 404 });
      }
      const blob = new Blob([image], { type: 'image/jpeg' })
      const fileName = v4();
      const imgRef = ref(imageDb, "files/"+fileName);
      await uploadBytes(imgRef, blob)

      const url = await getDownloadURL(ref(imageDb, "files/"+fileName));
      return NextResponse.json({url});
    } catch (error) {
      console.log("MAIN CAROUSEL POST", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
  
  export async function GET(req: NextRequest, res: NextResponse) {
    try {
    
  
      const response = await db.mainCarousel.findMany();
      return NextResponse.json({response});
    } catch (error) {
      console.log("MAIN CAROUSEL GET", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }