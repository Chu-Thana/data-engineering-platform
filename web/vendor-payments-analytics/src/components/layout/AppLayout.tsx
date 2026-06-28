import {
  Activity,
  Building2,
  Home,
  LayoutDashboard,
} from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

const navigationItems = [
  {
    label: 'Project Overview',
    to: '/',
    icon: Home,
    end: true,
  },
  {
    label: 'Executive Overview',
    to: '/overview',
    icon: LayoutDashboard,
  },
  {
    label: 'Department & Supplier',
    to: '/departments-suppliers',
    icon: Building2,
  },
  {
    label: 'Streaming & Validation',
    to: '/streaming-validation',
    icon: Activity,
  },
]

export function AppLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar__brand">
          <span className="sidebar__eyebrow">Vendor Payments</span>
          <strong>Analytics Platform</strong>
        </div>

        <nav className="sidebar__navigation" aria-label="Primary navigation">
          {navigationItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  isActive
                    ? 'sidebar__link sidebar__link--active'
                    : 'sidebar__link'
                }
              >
                <Icon aria-hidden="true" size={18} />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="sidebar__footer">
          <span>Portfolio Project</span>
          <strong>Data Engineering</strong>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}