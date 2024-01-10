import dbConnect from "@/app/lib/dbConnect";
import Issue, { Issues } from "@/app/models/Issue";
import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";
import { createIssueSchema } from "@/app/validationSchemas";

export async function POST(request: NextRequest, response: NextResponse) {
    const senderIp = request.headers.get("x-forwarded-for");
    const body = await request.json();
    await dbConnect();
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 });
    try {
        const newIssue = new Issue<Issues>({
            title: body.title,
            description: body.description,
            status: body.status,
        });
        await newIssue.save();
        return NextResponse.json(newIssue, { status: 201 });
    } catch (ex) {
        return NextResponse.json(ex, { status: 400 });
    }
}

export async function GET(request: NextRequest, response: NextResponse) {
    await dbConnect();
    try {
        const issues = await Issue.find();
        console.log(issues);
        return NextResponse.json(issues, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
}
