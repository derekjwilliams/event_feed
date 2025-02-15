// Note: TODO show week as human readable
export default async function Page({
  params,
}: {
  params: Promise<{ week: string }>
}) {
  const week = (await params).week
  return <div>Events for week {week}</div>
}
