import React from 'react'
import ResponsiveDrawer from '../../components/Sidebar/Sidebar'

export default function HomePage() {
    const homepageWindow = window; // Get the window object of the homepage
    const homeTab = (
        <h1>Home Page</h1>
    )
  return (
    <div>
      <ResponsiveDrawer tab={homeTab} />
    </div>
  )
}
