// -------------------------------------------------------------
// Component: AuthCard
// Purpose: Reusable card container for Login/Register forms.
// -------------------------------------------------------------

interface AuthCardProps {
  children: React.ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <div
      className="
        w-full
        mt-6
        p-6
        rounded-2xl
        bg-[#11172a]
        border border-white/10
      "
    >
      {children}
    </div>
  );
}
