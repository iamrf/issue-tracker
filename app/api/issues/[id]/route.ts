import authOptions from "@/app/auth/authOptions";
import { PatchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json("Unauthorized", { status: 4011 });

    const body = await request.json();
    const validation = PatchIssueSchema.safeParse(body);
    if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 });

    const { title, description } = body;

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!issue) return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

    const updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
            title,
            description,
        },
    });

    return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(rquest: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json("Unauthorized", { status: 401 });

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!issue) return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

    await prisma.issue.delete({
        where: { id: issue.id },
    });

    return NextResponse.json("");
}