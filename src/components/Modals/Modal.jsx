import react, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ isOpen, onClose, taskId }) {

    const defaultTask = [];

    const tasks = useSelector(state => state.tasks);

    let filteredTask = tasks.filter(task => task.id == taskId)[0];
    
  return (

    <div>
      <Modal
        className='bg-orange-200'
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            {filteredTask?
                <div>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        {filteredTask.title}
                    </Typography>
                    <Typography id="modal-modal-description">
                        {filteredTask.description}
                    </Typography>

                    
                    <Typography id="modal-modal-title" variant="h6">
                    Дата окончания: {filteredTask.deadline}
                    </Typography>
                        
                    
                </div>
                :
                <div></div>
            }
        </Box>
      </Modal>
    </div>
  );
}