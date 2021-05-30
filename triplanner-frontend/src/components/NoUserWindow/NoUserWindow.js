import style from './NoUserWindow.module.css';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';

const NoUserWindow = () => (
    <div className={style.noUserWindow}>
        <BrokenImageIcon style={{fontSize: '500%'}}/>
        <h4>Something went wrong</h4>
        <p>Try reloading the page</p>
    </div>
);

export default NoUserWindow;