import { SessionProvider } from "@/components/SessionProvider";
import Sidebar from "@/components/SideBar";
import { getServerSession } from "next-auth";
import "@/styles/globals.css";
import Login from "@/components/Login";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const metadata = {
  title: 'ChatGPT Clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              { /*Sidebar */}
              <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
                <Sidebar />
              </div>
              { /* Client provider = Notification */}
              <div className="bg-[#343541] flex-1">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html >
  )
}