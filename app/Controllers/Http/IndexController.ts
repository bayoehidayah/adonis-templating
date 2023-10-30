import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import { v4 as uuidv4 } from 'uuid';
import View from "@ioc:Adonis/Core/View";
// import uuid from "uuid"

export default class IndexController {
  index(){
    return View.render('auth/login');
  }
}
