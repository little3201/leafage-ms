import { Outlet } from "react-router"
import { PanelMenu } from 'primereact/panelmenu';
import type { MenuItem } from 'primereact/menuitem'

function App() {
  const items: MenuItem[] = [
    {
      label: 'Files',
      icon: 'pi pi-file',
      items: [
        {
          label: 'Documents',
          icon: 'pi pi-file',
          items: [
            {
              label: 'Invoices',
              icon: 'pi pi-file-pdf',
              items: [
                {
                  label: 'Pending',
                  icon: 'pi pi-stop'
                },
                {
                  label: 'Paid',
                  icon: 'pi pi-check-circle'
                }
              ]
            },
            {
              label: 'Clients',
              icon: 'pi pi-users'
            }
          ]
        },
        {
          label: 'Images',
          icon: 'pi pi-image',
          items: [
            {
              label: 'Logos',
              icon: 'pi pi-image'
            }
          ]
        }
      ]
    },
    {
      label: 'Cloud',
      icon: 'pi pi-cloud',
      items: [
        {
          label: 'Upload',
          icon: 'pi pi-cloud-upload'
        },
        {
          label: 'Download',
          icon: 'pi pi-cloud-download'
        },
        {
          label: 'Sync',
          icon: 'pi pi-refresh'
        }
      ]
    },
    {
      label: 'Devices',
      icon: 'pi pi-desktop',
      items: [
        {
          label: 'Phone',
          icon: 'pi pi-mobile'
        },
        {
          label: 'Desktop',
          icon: 'pi pi-desktop'
        },
        {
          label: 'Tablet',
          icon: 'pi pi-tablet'
        }
      ]
    }
  ]
  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-[var(--primary-color)] h-14">
        <div className="flex items-center">
          <span className="py-3">Title</span>
        </div>
      </header>
      <aside className="w-64 fixed top-14">
        <PanelMenu model={items} />
      </aside>
      <main className="ml-64 mt-14 p-5 bg-gray-100">
        <Outlet />
      </main>
      <footer className="bg-[var(--secondry-color)] ml-64 h-14 p-5 text-center">
        <span>sssssssssss</span>
      </footer>
    </>
  )
}

export default App
