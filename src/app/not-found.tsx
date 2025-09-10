import Button from '@/components/common/Button'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">Not Found</h1>
      <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">Could not find requested resource by ritu</p>
      <Button
        href="/"
        text="Return Home"
        variant="secondary"
        className="!w-48"
      />
    </div>
  )
}