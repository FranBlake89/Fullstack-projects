import Sidebar, { SidebarItem } from "../components/SideBar";
import{
    LifeBuoy,
    Receipt,
    Boxes,
    Package,
    UserCircle,
    BarChart3,
    LayoutDashboard,
    Settings, 
    BookType,
    Sheet
} from 'lucide-react';

export default function Dashboard(){
    return(
        <main className="App">
            <Sidebar>
                <SidebarItem icon={<LayoutDashboard size={20} />} text='Dashboard' alert />
                <SidebarItem icon={<BarChart3 size={20} />} text='Stats' active />
                <SidebarItem icon={<UserCircle size={20} />} text='Users'  />
                <SidebarItem icon={<Boxes size={20} />} text='Inventory'  />
                <SidebarItem icon={<Receipt size={20} />} text='Billing'  />
                <SidebarItem icon={<Package size={20} />} text='Orders' alert />
                <hr className="my-3" />
                <SidebarItem icon={<Sheet size={20} />} text='Tables'  />
                <SidebarItem icon={<BookType size={20} />} text='Forms'  />
                <hr className="my-3" />
                <SidebarItem icon={<Settings size={20} />} text='Setting'  />
                <SidebarItem icon={<LifeBuoy size={20} />} text='Help'  />
            </Sidebar>
        </main>
    )
}