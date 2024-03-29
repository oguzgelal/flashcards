import get from 'lodash/get';
import Session from './Session';

export const SESSION_TYPE_TABLE = 'table';

class SessionTable extends Session {

  generateOrigin({ set } = {}) {
    const origin = { type: SESSION_TYPE_TABLE, set };
    return this.validateOrigin(origin);
  };

}

export default new SessionTable();
