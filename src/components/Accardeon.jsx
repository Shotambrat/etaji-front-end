import react, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Check from '@mui/icons-material/Check';

export default function ControlledAccordions({onFilterChange, onFullChange}) {
  const [expanded, setExpanded] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [fullFilter, setFullFilter] = useState('');

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  const handleFullClick = (filter) => {
    setFullFilter(filter);
    onFullChange(filter);
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>
            По периоду
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{width: '200px'}}>
        <MenuList dense className="flex flex-col ">
            <MenuItem selected={selectedFilter === 'today'} onClick={() => handleFilterClick('today')}>
                <ListItemIcon>
                  {selectedFilter === 'today' && <Check />}
                </ListItemIcon>
                <ListItemText sx={{width: '200px'}}>Сегодня</ListItemText>
            </MenuItem>
            <MenuItem selected={selectedFilter === 'week'} onClick={() => handleFilterClick('week')}>
                <ListItemIcon>
                  {selectedFilter === 'week' && <Check />}
                </ListItemIcon>
                <ListItemText sx={{width: '200px'}}>На неделю</ListItemText>
            </MenuItem>
            <MenuItem selected={selectedFilter === 'month'} onClick={() => handleFilterClick('month')}>
                <ListItemIcon>
                  {selectedFilter === 'month' && <Check />}
                </ListItemIcon>
                <ListItemText sx={{width: '200px'}}>На месяц</ListItemText>
            </MenuItem>
           </MenuList>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>
            Другие
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{width: '200px'}}>
        <MenuList dense className="flex flex-col ">
            <MenuItem selected={fullFilter === 'pending'} onClick={() => handleFullClick('pending')}>
                <ListItemIcon>
                  {fullFilter === 'pending' && <Check />}
                </ListItemIcon>
                <ListItemText sx={{width: '200px'}}>Не завершенные</ListItemText>
            </MenuItem>
            <MenuItem selected={fullFilter === 'fullfield'} onClick={() => handleFullClick('fullfield')}>
                <ListItemIcon>
                  {fullFilter === 'fullfield' && <Check />}
                </ListItemIcon>
                <ListItemText sx={{width: '200px'}}>Завершенные</ListItemText>
            </MenuItem>
           </MenuList>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
