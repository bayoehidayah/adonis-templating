import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { v4 as uuidv4 } from 'uuid';
import { compose } from '@ioc:Adonis/Core/Helpers'
import { column, beforeSave, BaseModel, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'

export default class User extends compose(BaseModel, SoftDeletes) {
  public static table = "users"
  public static selfAssignPrimaryKey = true

  @column({isPrimary: true})
  public id: string

  @column()
  public nik: string

  @column()
  public nama: string

  @column()
  public tipe: Tipe

  @column()
  public j_k: Jenkel

  @column()
  public username: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column()
  public active: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ columnName: 'customDeletedAtColumn' })
  public deletedAt: DateTime | null

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeCreate()
  public static setDefaultVal(user : User){
      user.id     = uuidv4().replaceAll("-", "")
      user.active = true
  }
}

export enum Jenkel {
  LAKI_LAKI  = "l",
  PEREMPUAN  = "p"
}

export enum Tipe {
  SUPER_ADMIN = "super_admin",
  USER        = "user"
}
