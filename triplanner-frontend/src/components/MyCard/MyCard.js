import style from './MyCard.module.css';

const MyCard = props => (
    <div className={style.card} style={props.style}>
        {props.children}
    </div>
);

export default MyCard;