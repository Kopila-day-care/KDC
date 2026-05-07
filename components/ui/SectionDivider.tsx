interface SectionDividerProps {
  flip?: boolean;
}

export default function SectionDivider({ flip = false }: SectionDividerProps) {
  return (
    <div
      className={`scalloped-divider ${flip ? "rotate-180" : ""}`}
      aria-hidden="true"
    />
  );
}
