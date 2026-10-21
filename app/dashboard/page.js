import { getOrCreateUser } from "@/lib/user";

export default async function Dashboard() {
  const user = await getOrCreateUser();

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name} 👋</h1>
          <p className="text-gray-400 mt-2">Your AI videos will appear here.</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-3 text-center">
          <p className="text-2xl font-bold">{user?.credits}</p>
          <p className="text-gray-400 text-sm">credits left</p>
        </div>
      </div>
    </main>
  );
}