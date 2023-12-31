import React, { useState } from 'react'
import DashboardHeader from './dashboard-header'
import DashboardWidgets from './widgets/dashboard-widgets'

interface DashboardHeroProps {
  isDashboard?: boolean
}

const DashboardHero = ({isDashboard}:DashboardHeroProps) => {
  const [open, setOpen] = useState(false)
  
  return (
    <div>
      <DashboardHeader open={open} setOpen={setOpen}/>
      {
        isDashboard && (
          <DashboardWidgets open={open} />
        )
      }
    </div>
  )
}

export default DashboardHero