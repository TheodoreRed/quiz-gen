import {
  Subject,
  CreateSubjectBody,
  UpdateSubjectBody,
} from "@/types/subject/types";

// GET all subjects for a user
export async function fetchSubjects(userId: string): Promise<Subject[]> {
  const res = await fetch(
    `/api/subjects?userId=${encodeURIComponent(userId)}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch subjects: ${res.statusText}`);
  }

  return res.json();
}

// POST a new subject
export async function createSubject(body: CreateSubjectBody): Promise<Subject> {
  const res = await fetch("/api/subjects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Failed to create subject: ${res.statusText}`);
  }

  return res.json();
}

// PUT update an existing subject
export async function updateSubject(body: UpdateSubjectBody): Promise<void> {
  const res = await fetch("/api/subjects", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to update subject.");
  }
}
