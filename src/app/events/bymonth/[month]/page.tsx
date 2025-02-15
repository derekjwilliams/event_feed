// Note: accept either month name or month number (1 for January, to make it easy for the user)
export default async function Page({
  params,
}: {
  params: Promise<{ month: string }>
}) {
  const month = (await params).month
  return <div>Events for month {month}</div>
}
