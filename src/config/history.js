import { createBrowserHistory as createHistory } from 'history';
import enhanceHistory from '../utils/enhanceHistory';

export default enhanceHistory(createHistory());
