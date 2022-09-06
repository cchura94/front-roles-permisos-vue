import { Ability } from '@casl/ability'
import { initialAbility } from './config'

// obtener los (permisos o habilidades) del usuario en localstorage
const userData = JSON.parse(localStorage.getItem("userData"));

const existeAbility = userData ? userData.ability: null

export default new Ability(existeAbility || initialAbility)