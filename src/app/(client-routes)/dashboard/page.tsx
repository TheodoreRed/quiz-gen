import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/auth/auth";
import Dashboard from "@/app/ui/dashbaord/Dashboard";
import { getSubjectsByUserId } from "@/app/lib/subjects/db";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const subjects = await getSubjectsByUserId(session.user.id);

  return (
    <Dashboard
      userName={session.user.name ?? "User"}
      subjects={subjects}
      userId={session.user.id}
    />
  );
}
