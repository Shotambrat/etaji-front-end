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

export default function ControlledAccordions() {
  const [expanded, setExpanded] = useState(false);

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
          <Typography sx={{ flexShrink: 0 }}>
            По периоду
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <MenuList dense>
            <MenuItem>
                <ListItemIcon>
                <Check />
                </ListItemIcon>
                <ListItemText>Сегодня</ListItemText>
            </MenuItem>
            <MenuItem>
                <ListItemText>На неделю</ListItemText>
            </MenuItem>
            <MenuItem>
                <ListItemText >На месяц</ListItemText>
            </MenuItem>
           </MenuList>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ flexShrink: 0 }}>
            По дате
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <MenuList dense>
            <MenuItem>
                <ListItemIcon>
                <Check />
                </ListItemIcon>
                <ListItemText>Дата окончания</ListItemText>
            </MenuItem>
            <MenuItem>
                <ListItemText>Дата создания</ListItemText>
            </MenuItem>
            <MenuItem>
                <ListItemText >Дата обновления</ListItemText>
            </MenuItem>
           </MenuList>
        </AccordionDetails>
      </Accordion>
      <Accordion>
      <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ flexShrink: 0 }}>
            Другие
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <MenuList dense>
            <MenuItem>
                <ListItemIcon>
                  <Check />
                </ListItemIcon>
                <ListItemText>Завершенные</ListItemText>
            </MenuItem>
           </MenuList>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
