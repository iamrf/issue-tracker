import authOptions from "@/app/auth/authOptions";
import { PatchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json("Unauthorized", { status: 401 });

    const body = await request.json();
    const validation = PatchIssueSchema.safeParse(body);
    if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 });

    const { title, description, userId } = body;

    if (userId) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) return NextResponse.json({ error: "Invalid user" }, { status: 404 });
    }

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
    });
    if (!issue) return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

    const updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
            title,
            description,
            userId,
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
