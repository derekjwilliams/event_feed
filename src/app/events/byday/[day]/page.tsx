// Note: TODO show day as human readable
export default async function Page({
  params,
}: {
  params: Promise<{ day: string }>
}) {
  const day = (await params).day
  return <div>Events for day {day}</div>
}
