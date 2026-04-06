// -------------------------------------------------------------
// Component: AuthTitleBlock
// Purpose: Shared title + subtitle block for Login/Register.
// -------------------------------------------------------------

interface AuthTitleBlockProps {
  title: string;
  subtitle?: string;
}

export default function AuthTitleBlock({
  title,
  subtitle,
}: AuthTitleBlockProps) {
  return (
    <div className="mt-6 mb-8">
      <h1 className="text-3xl font-bold tracking-wide mb-2">{title}</h1>
      {subtitle && <p className="text-gray-400">{subtitle}</p>}
    </div>
  );
}
