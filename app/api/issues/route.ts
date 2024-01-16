import authOptions from "@/app/auth/authOptions";
import { IssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json("Unauthorized", { status: 401 });

    const senderIp = request.headers.get("x-forwarded-for");
    const body = await request.json();
    const validation = IssueSchema.safeParse(body);
    if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 });

    try {
        const newIssue = await prisma.issue.create({
            data: {
                title: body.title,
                description: body.description,
            },
        });
        return NextResponse.json(newIssue, { status: 201 });
    } catch (ex) {
        return NextResponse.json("", { status: 400 });
    }
}

export async function GET(request: NextRequest, response: NextResponse) {
    try {
        const issues = await prisma.issue.findMany();
        return NextResponse.json(issues, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
}
