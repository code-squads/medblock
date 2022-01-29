import { AUTHORITY_TYPES } from '../Constants/authorityTypes';

export function isValidAuthority(authorityType){
    if(!authorityType || authorityType === '')
        return false;
    for(let eachAuthority of Object.values(AUTHORITY_TYPES)){
        if(authorityType === eachAuthority)
            return true;
    }
    return false;
}