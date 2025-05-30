import type { JSX } from 'react'
const HighlightCard = ({
  title,
  description,
  icon,
}: { title: string; description: string; icon: JSX.Element }) => {
  return (
    <div className="flex flex-1  flex-col min-w-[200px] p-5 py-10 bg-white rounded-2xl border-[1px] border-zinc-400/20">
      {icon}
      <h4 className="text-xl font-semibold mt-5">{title}</h4>
      <p className="text-foreground/70 text-md mt-3 text-pretty">
        {description}
      </p>
    </div>
  )
}

export default HighlightCard
