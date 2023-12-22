
import { Outlet } from "react-router-dom";

const MainLayout = () => {
 
  return (
    <div >
      <div className='layout_main-content'>
        <Outlet />
      </div>
    </div>
  );
 
};

export {MainLayout}; 