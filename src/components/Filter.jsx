import react, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import filterIcon from '../assets/svg/filter-svgrepo-com.svg';
import Accardeon from '../components/Accardeon'

export default function BasicMenu({onFilterChange, onFullChange}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
        <Button
            className='flex justify-center items-center border-red-600 border-2'
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
            <img className='h-[30px]' src={filterIcon} alt='filterIcon' />
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        >
        
                <Accardeon onFilterChange={onFilterChange} onFullChange={onFullChange}/>
        </Menu>
        </div>
    );
}