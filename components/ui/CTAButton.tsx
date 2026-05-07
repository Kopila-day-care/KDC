import Link from "next/link";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "default" | "large";
  icon?: string;
  className?: string;
}

export default function CTAButton({
  href,
  children,
  variant = "primary",
  size = "default",
  icon,
  className = "",
}: CTAButtonProps) {
  const base =
    "rounded-full font-bold transition-all inline-flex items-center gap-3";
  const sizeClass =
    size === "large" ? "px-10 py-5 text-lg shadow-lg" : "px-6 py-2.5 text-sm shadow-md";
  const variantClass =
    variant === "primary"
      ? "bg-primary text-on-primary hover:scale-95"
      : "border-2 border-secondary-container text-secondary hover:bg-secondary-container/20";

  return (
    <Link href={href} className={`${base} ${sizeClass} ${variantClass} ${className}`}>
      {icon && (
        <span className="material-symbols-outlined">{icon}</span>
      )}
      {children}
    </Link>
  );
}
