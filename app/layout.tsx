import { SessionProvider } from "@/components/SessionProvider";
import Sidebar from "@/components/SideBar";
import { getServerSession } from "next-auth";
import "@/styles/globals.css";
import Login from "@/components/Login";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import ClientProvider from "@/components/ClientProvider";

export const metadata = {
  title: 'JoseGPT',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="bg-gray-100">
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">

              <div className="bg-blue-600 max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
                <Sidebar />
              </div>

              <ClientProvider />

              <div className="bg-gray-200 flex-1">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html >
  )
}
