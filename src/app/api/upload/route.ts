import { NextResponse } from "next/server"
import { createRequire } from 'module'
import { db } from "@/lib/db"

const require = createRequire(import.meta.url)

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
      // pdf-parse is a function, not a class
      const pdfParse = require('pdf-parse')
      const data = await pdfParse(buffer)
      content = data.text || ""
    } else if (
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const mammoth = require('mammoth')
      const data = await mammoth.extractRawText({ buffer })
      content = data.value || ""
    } else if (file.type === "text/plain" || file.type === "text/markdown") {
      content = buffer.toString("utf-8")
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Use PDF, DOCX, or TXT." },
        { status: 400 }
      )
    }

    // Save metadata to DB
    const doc = await db.document.create({
      data: {
        name:   file.name,
        size:   file.size,
        type:   file.type,
        url:    "local-storage",
        key:    crypto.randomUUID(),
        status: "COMPLETED",
        userId: "demo-user-id",
      },
    })

    return NextResponse.json({
      success:    true,
      id:         doc.id,
      name:       doc.name,
      textLength: content.length,
    })

  } catch (error: any) {
    console.error("[Upload Error]", error?.message ?? error)
    return NextResponse.json(
      { error: "Failed to process document", details: error?.message },
      { status: 500 }
    )
  }
}
