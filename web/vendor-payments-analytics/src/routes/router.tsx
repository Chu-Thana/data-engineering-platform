import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '../components/layout/AppLayout'
import { DepartmentSupplierPage } from '../pages/DepartmentSupplierPage'
import { ExecutiveOverviewPage } from '../pages/ExecutiveOverviewPage'
import { ProjectOverviewPage } from '../pages/ProjectOverviewPage'
import { StreamingValidationPage } from '../pages/StreamingValidationPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <ProjectOverviewPage />,
      },
      {
        path: 'overview',
        element: <ExecutiveOverviewPage />,
      },
      {
        path: 'departments-suppliers',
        element: <DepartmentSupplierPage />,
      },
      {
        path: 'streaming-validation',
        element: <StreamingValidationPage />,
      },
    ],
  },
])