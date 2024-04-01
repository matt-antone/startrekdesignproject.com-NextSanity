import Link from 'next/link'

export default function Container(props) {
  return (
    <div className="px-8 lg:px-0 w-full mx-auto md:max-w-4xl lg:max-w-4xl xl:max-w-5xl">
      {props.children}
    </div>
  )
}
