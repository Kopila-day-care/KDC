interface HoursDisplayProps {
  className?: string;
}

export default function HoursDisplay({ className = "" }: HoursDisplayProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="w-12 h-12 rounded-full bg-on-primary/10 flex items-center justify-center">
        <span className="material-symbols-outlined">schedule</span>
      </div>
      <div>
        <span className="block font-bold">Mon - Fri</span>
        <span className="opacity-80">7:30 AM - 5:30 PM</span>
      </div>
    </div>
  );
}
