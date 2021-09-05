import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
export class Users {
  @PrimaryColumn()
  id: number

  @Column("bigint", { default: 300 })
  balance: number
}
