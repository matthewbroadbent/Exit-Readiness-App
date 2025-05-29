import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Assessment from './pages/Assessment'
import Results from './pages/Results'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import { useEffect } from 'react'
import { supabase } from './lib/supabaseClient'

function App() {
  useEffect(() => {
    // Log page views for analytics
    const logPageView = async () => {
      try {
        await supabase
          .from('page_views')
          .insert([{ page: window.location.pathname }])
      } catch (error) {
        console.error('Error logging page view:', error)
      }
    }
    
    logPageView()
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="assessment" element={<Assessment />} />
        <Route path="results" element={<Results />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
