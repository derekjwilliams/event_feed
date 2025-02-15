// Note: the interval is a hyphen separated start and end date
export default async function Page({
  params,
}: {
  params: Promise<{ interval: string }>
}) {
  const interval = (await params).interval
  return <div>Events for interval {interval}</div>
}
