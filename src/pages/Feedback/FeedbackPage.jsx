import React from 'react'
import ResponsiveDrawer from '../../components/Sidebar/Sidebar'

export default function FeedbackPage() {
    const feedback = (
        <h1>Feedback page</h1>
    )
  return (
    <ResponsiveDrawer tab={feedback} />
  )
}
