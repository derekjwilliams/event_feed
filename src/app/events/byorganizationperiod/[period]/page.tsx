// Note: period will map to specific start and end dates
export default async function Page({
  params,
}: {
  params: Promise<{ period: string }>
}) {
  const period = (await params).period
  return <div>Events for organization period {period}</div>
}
