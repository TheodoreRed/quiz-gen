import { NextRequest, NextResponse } from "next/server";
import {
  CreateSubjectBody,
  Subject,
  UpdateSubjectBodyServer,
} from "@/app/types/subject/types";
import { getDb } from "@/app/lib/auth/mongo/getMongoClient";
import { getSubjectsByUserId } from "@/app/lib/subjects/db";

// return all subjects for a user
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const subjects = await getSubjectsByUserId(userId);
    return NextResponse.json(subjects);
  } catch (err) {
    console.error("[GET /api/subjects] Failed to fetch subjects:", err);
    return NextResponse.json(
      { error: "Failed to retrieve subjects" },
      { status: 500 }
    );
  }
}

// create a new subject
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CreateSubjectBody;

    const name = body?.name?.trim?.();
    const description = body?.description?.trim?.() ?? "";
    const userId = body?.userId?.trim?.();

    console.log("[POST /api/subjects] Incoming body:", body);

    if (!name || !userId) {
      console.warn("[POST /api/subjects] Missing required fields:", {
        name,
        userId,
      });
      return NextResponse.json(
        { error: "Missing required fields: name and userId" },
        { status: 400 }
      );
    }

    const newSubject: Subject = {
      name,
      description,
      userId,
      createdTs: new Date().toISOString(),
    };

    const db = await getDb();
    const result = await db
      .collection<Subject>("subjects")
      .insertOne(newSubject);

    if (!result.acknowledged || !result.insertedId) {
      console.error("[POST /api/subjects] Insert failed", result);
      return NextResponse.json(
        { error: "Failed to insert subject" },
        { status: 500 }
      );
    }

    console.log("[POST /api/subjects] Successfully created subject:", {
      _id: result.insertedId,
      ...newSubject,
    });

    return NextResponse.json(
      {
        _id: result.insertedId.toString(),
        ...newSubject,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/subjects] Unexpected error:", err);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}

// update an existing subject
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { _id, name, description } = body as UpdateSubjectBodyServer;

  if (!_id || !name) {
    return NextResponse.json({ error: "Missing _id or name" }, { status: 400 });
  }

  const db = await getDb();
  const result = await db
    .collection<Subject>("subjects")
    .updateOne(
      { _id },
      { $set: { name: name.trim(), description: description?.trim() ?? "" } }
    );

  if (result.modifiedCount === 0) {
    return NextResponse.json(
      { error: "Subject not found or unchanged" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Subject updated" }, { status: 200 });
}
