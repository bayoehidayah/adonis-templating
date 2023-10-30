import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 50).primary()
      table.string("nik", 16).notNullable().unique()
      table.string("nama", 80).notNullable()
      table.string("tipe", 10).notNullable()
      table.enum("j_k", ["l", "p"]).defaultTo("l")
      table.string('username', 80).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()

      table.boolean("active").defaultTo(1).notNullable()

      table.timestamps()
      table.timestamp('deleted_at', { useTz: true }).nullable() //SoftDelete
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
