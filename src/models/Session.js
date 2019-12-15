import get from 'lodash/get';

class Session {

  generateOrigin(args) {
    throw new Error('Required method not implemented')
  }

  validateOrigin(origin) {
    if (!origin) throw new Error('No origin provided')
    if (!get(origin, 'id')) throw new Error('No identifier provided for the origin')
    if (!get(origin, 'type')) throw new Error('Origin type missing')
    return origin;
  }

}

export default Session;
