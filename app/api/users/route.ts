import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await dbConnect();
    const users = await User.find().sort("name");
    return NextResponse.json(users, { status: 200 });
}
