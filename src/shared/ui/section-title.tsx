type SectionTitleProps = {
  title: string;
  description?: string;
};

export function SectionTitle({ title, description }: SectionTitleProps) {
  return (
    <div className="space-y-1">
      <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
        {title}
      </h2>
      {description ? (
        <p className="text-xs text-slate-500 font-medium">{description}</p>
      ) : null}
    </div>
  );
}
