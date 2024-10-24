import Sidebar, { SidebarItem } from "../components/SideBar";
import TableProjects from "../components/Projects";
import Modal from "../components/ModalCrud";
import Form from "../components/ProjectForm";
import Footer from '../components/Footer';
import{
    LifeBuoy,
    School,
    LibraryBig,
    BarChart3,
    LayoutDashboard,
    Settings, 
    ClipboardPen,
    Github
} from 'lucide-react';

function Dashboard(){
    return(
        <>
        <main className="flex ">
            <Sidebar>
                <SidebarItem icon={<LayoutDashboard size={20} />} text='Dashboard' alert />
                <SidebarItem icon={<BarChart3 size={20} />} text='Stats'  />
                <SidebarItem icon={<LibraryBig size={20} />} text='Projects' active  />
                <SidebarItem icon={<School size={20} />} text='Education'  />
                <SidebarItem icon={<ClipboardPen size={20} />} text='Forms'  />
                <hr className="my-3" />
                <SidebarItem icon={<Settings size={20} />} text='Setting' />
                <SidebarItem icon={<LifeBuoy size={20} />} text='Help'  />
                <hr className="my-3" />
                <SidebarItem icon={<Github size={20} />} text='Connect to GitHub'  />
            </Sidebar>

            <div className="flex-1 p-6 ">
                {/* Agrega un encabezado opcional para el dashboard */}
                <h1 className="text-6xl font-black mb-4 text-sky-900">Dashboard</h1>
                {/* Contenedor de tabla */}
                <div className=" p-4">
                    <Modal form={<Form />} title='Create a new project'/>
                    <TableProjects />
                </div>
            </div>
            
            </main>

<Footer />
</>      

    )
}

export default Dashboard; 