import dbConnect from "@/app/lib/dbConnect";
import Issue, { Issues } from "@/app/models/Issue";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import _ from "lodash";

const createIssueSchema = z.object({
    title: z.string().min(1, "title is required").max(255),
    description: z.string(),
});

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
