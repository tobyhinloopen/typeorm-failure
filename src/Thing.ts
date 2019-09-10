import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Thing {
  @PrimaryGeneratedColumn({ type: "integer" })
  public id: number;

  @Column({ type: "hstore", hstoreType: "object" })
  public values: Record<string, string>;
}
