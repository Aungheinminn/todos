"use client"
import { redirect } from "next/navigation";


export default function Page() {
  const a = "a"
  if(a) {
    redirect(`/home/${a}`)
  } else {
    redirect('no-topic')
  }
  return (
      <main className="flex flex-col items-center justify-between p-24">
      </main>

  );
}
