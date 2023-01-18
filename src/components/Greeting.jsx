import { h } from "preact"
import {useState } from "preact/hooks"

export default function Greeting({message}) {
  const randomMessage = () => message[(Math.floor(Math.random() * message.length))]
  const [greeting, setGreeting] = useState(randomMessage())
  return (
    <div>
      <h3>{greeting}! Thank you for visiting.</h3>
      <button onClick={() => setGreeting(randomMessage())}>
        New Greeting
      </button>
    </div>
  )
}