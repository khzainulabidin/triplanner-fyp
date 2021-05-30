import page_not_found from '../../assets/page_not_found.svg';
import ErrorPageLayout from "../../components/ErrorPageLayout/ErrorPageLayout";

const PageNotFound = () => {
    return(
        <ErrorPageLayout icon={page_not_found} text={"The page you're looking for, does not exist"}/>
    );
}

export default PageNotFound;
