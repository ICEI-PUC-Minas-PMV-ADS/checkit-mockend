import { Menubar } from 'primereact/menubar';
import { BsGrid1X2Fill, BsPlusSquareFill, BsGearFill, BsDoorClosedFill } from "react-icons/bs"
import { useNavigate } from 'react-router-dom';


export default function MenuBar() {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        navigate("/");
      };

    const items = [
        {
            icon: <BsGrid1X2Fill />

        },
        {
            icon: <BsPlusSquareFill />

        },
        {
            icon: <BsGearFill />,
        }
    ]
    const end = < BsDoorClosedFill className="mx-3" onClick={handleSubmit} />

    return (
        <div className="card">
          <Menubar model={items} end={end} />
        </div>
    )
}
