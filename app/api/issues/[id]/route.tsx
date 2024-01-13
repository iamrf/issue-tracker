import authOptions from "@/app/auth/authOptions";
import dbConnect from "@/app/lib/dbConnect";
import Issue, { Issues } from "@/app/models/Issue";
import { IssueSchema } from "@/app/validationSchemas";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json("Unauthorized", { status: 4011 })

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

export async function DELETE(rquest: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json("Unauthorized", { status: 401 })

    if (!mongoose.Types.ObjectId.isValid(params.id)) return NextResponse.json('not found', { status: 404 })

    await dbConnect()
    try {
        await Issue.findByIdAndDelete(params.id)
        return NextResponse.json(`issue ${params.id} deleted`, { status: 200 })
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
}