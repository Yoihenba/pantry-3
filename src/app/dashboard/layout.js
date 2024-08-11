import { ClerkLoaded } from "@clerk/nextjs"
function DashboardLayout({children}) {
  return (
    <ClerkLoaded>
        <div>
            
            <main>
                {children}
            </main>
        </div>
    </ClerkLoaded>
  )
}

export default DashboardLayout