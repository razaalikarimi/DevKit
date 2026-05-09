import { NextResponse } from "next/server"
import pdf from "pdf-parse"
import mammoth from "mammoth"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    let content = ""

    if (file.type === "application/pdf") {
      const data = await pdf(buffer)
      content = data.text
    } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      const data = await mammoth.extractRawText({ buffer })
      content = data.value
    } else if (file.type === "text/plain") {
      content = buffer.toString()
    } else {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 400 })
    }

    // Save metadata to DB
    const doc = await db.document.create({
      data: {
        name: file.name,
        size: file.size,
        type: file.type,
        url: "local-storage", // In a real app, this would be an S3/UploadThing URL
        key: Math.random().toString(36).substring(7),
        status: "COMPLETED",
        userId: "demo-user-id"
      }
    })

    return NextResponse.json({ 
      success: true, 
      id: doc.id,
      textLength: content.length 
    })

  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
