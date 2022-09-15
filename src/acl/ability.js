import { Ability } from '@casl/ability'
import { initialAbility } from './config'
import { Buffer } from 'buffer';

// obtener los (permisos o habilidades) del usuario en localstorage
let user = localStorage.getItem("userData")
let userData = null;
if(user){
    let data = Buffer.from(user, 'base64').toString('ascii');
    
    userData = JSON.parse(data);
}

const existeAbility = userData ? userData.usuario.ability: null

export default new Ability(existeAbility || initialAbility)