import { currentUser } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const user = await currentUser();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Welcome, {user?.firstName} 👋</h1>
      <p className="text-gray-400 mt-2">Your AI videos will appear here.</p>
    </main>
  );
}