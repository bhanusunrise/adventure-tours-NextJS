import SideNav from "@/app/components/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <div
        className="flex flex-grow md:flex-row md:overflow-hidden bg-cover bg-center relative"
        style={{ backgroundImage: "url('/home_bg.jpg')" }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/80" />

        <div className="w-full flex-none md:w-36 relative z-10">
          <SideNav />
        </div>
        
        <div className="flex-grow p-6 md:overflow-y-auto md:p-6 relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
