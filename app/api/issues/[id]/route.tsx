import dbConnect from "@/app/lib/dbConnect";
import Issue, { Issues } from "@/app/models/Issue";
import { IssueSchema } from "@/app/validationSchemas";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    if (!mongoose.Types.ObjectId.isValid(params.id)) return NextResponse.json("not found", { status: 404 })

    const body = await request.json()
    const validation = IssueSchema.safeParse(body)
    if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 })

    await dbConnect()
    try {
        const issue = await Issue.findById<Issues>(params.id)
        if (!issue) return NextResponse.json("not found", { status: 404 })
        issue.title = body.title
        issue.description = body.description
        await issue.save()
        return NextResponse.json(issue, { status: 200 })
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
}