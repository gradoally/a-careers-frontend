export default async function Await<T>({
  promise,
  children
}: {
  promise: Promise<T>
  children: (value: T) => JSX.Element
}) {
  try {
    let data = await promise
    return children(data)

  }catch (e) {
    return <div>Error handler - Await component</div>
  }

}
