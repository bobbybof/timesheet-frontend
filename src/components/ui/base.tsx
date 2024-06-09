import { tm } from "@/utils/twmerge"

function Base({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={tm("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Base }
