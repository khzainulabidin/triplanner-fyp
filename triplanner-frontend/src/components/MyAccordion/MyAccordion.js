import style from './MyAccordion.module.css';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";

const MyAccordion = ({heading, content}) => {
    return(
        <Accordion style={{marginTop: '1%'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <span className={style.heading}>{heading}</span>
            </AccordionSummary>
            <AccordionDetails>
                <span className={style.content}>{content}</span>
            </AccordionDetails>
        </Accordion>
    );
}

export default MyAccordion;
