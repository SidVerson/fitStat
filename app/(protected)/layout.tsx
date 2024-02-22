import { ClerkProvider } from "@clerk/nextjs";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import ActiveWorkoutWarning from "@/components/Notices/ActiveWorkoutWarning";
import LayoutWrapper from "./LayoutWrapper.client";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <div className="flex">
        <Sidebar />
        <main className="flex-grow w-full">
          <Navbar />
          <LayoutWrapper>
            <ActiveWorkoutWarning />
            {children}
          </LayoutWrapper>
        </main>
      </div>
    </ClerkProvider>
  );
}
