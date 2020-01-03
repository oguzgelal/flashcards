import isNil from 'lodash/isNil';

export const DEL = '';

export default ({ key, uniq, random } = {}) => {

  // describe the id
  const useKey = isNil(key) ? '' : `${key}${DEL}`;

  // add unique string from the resource
  let useUniq = '';
  if (!isNil(uniq)) {
    if (Array.isArray(uniq)) useUniq = `${uniq.filter(i => !!i).join('.')}${DEL}`;
    else useUniq = `${uniq}${DEL}`;
  }

  // add randomness
  const useRandom = !random ? '' : `${Math.round(Math.random() * 10000000000)}${DEL}`;

  // combine and remove trailing underscore
  let final = `${useKey}${useUniq}${useRandom}`;
  if (final.substr(-1) === DEL) final = final.substr(0, final.length - 1);

  return final;
}
