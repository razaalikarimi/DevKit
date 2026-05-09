import { NextResponse } from "next/server"
import { createRequire } from 'module'

// Polyfill for PDF.js in Node.js environment
if (typeof global.DOMMatrix === 'undefined') {
  (global as any).DOMMatrix = class DOMMatrix {
    constructor() {}
  };
}

const require = createRequire(import.meta.url)
const pdfModule = require('pdf-parse')
const PDFParseClass = pdfModule.PDFParse || pdfModule
const mammoth = require('mammoth')
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
      const pdfParser = new PDFParseClass(buffer)
      const data = await pdfParser.getText()
      content = data.text || ""
    } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      const data = await mammoth.extractRawText({ buffer })
      content = data.value || ""
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
        url: "local-storage",
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

  } catch (error: any) {
    console.error("Upload error details:", error)
    return NextResponse.json({ 
      error: "Failed to process document",
      details: error.message 
    }, { status: 500 })
  }
}
