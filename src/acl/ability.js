import { Ability } from '@casl/ability'
import { initialAbility } from './config'
import { Buffer } from 'buffer';

// obtener los (permisos o habilidades) del usuario en localstorage
let data = Buffer.from(localStorage.getItem("userData"), 'base64').toString('ascii');
const userData = JSON.parse(data);

const existeAbility = userData ? userData.usuario.ability: null

export default new Ability(existeAbility || initialAbility)