import { ReactElement } from "react"

export default async function Await<T>({
  promise,
  children
}: {
  promise: Promise<T>
  children: (value: T) => ReactElement
}) {
  try {
    let data = await promise
    return children(data)

  }catch (e) {
    return <div>Error handler - Await component</div>
  }

}
