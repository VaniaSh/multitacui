import Sidebar from "@/components/Sidebar";

export default function FrontLayout({
                                        children,
                                    }: {
    children: React.ReactNode
}) {
    return (
        <main className="w-full mx-auto">
          {children}
        </main>
    )
}
