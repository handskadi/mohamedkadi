'use client'
import { useState } from 'react'
import { FaEnvelope } from 'react-icons/fa'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()
      setLoading(false)
      setMessage(data.message)
      if (data.success) setEmail('')
    } catch (err) {
      setLoading(false)
      setMessage('An error occurred. Please try again later.')
    }
  }

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-16 px-6">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Subscribe to our Newsletter</h2>
        <p className="mt-4 text-gray-500 dark:text-gray-400">
          Stay updated with the latest news, insights, and trends!
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-4">
          <div className="relative w-full">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email"
              className="pl-10 pr-4 py-3 w-full rounded-md border border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium"
            disabled={loading}
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-center text-blue-600 dark:text-blue-400">{message}</p>
        )}
      </div>
    </section>
  )
}

export default Newsletter
