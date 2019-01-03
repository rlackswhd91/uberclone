import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { rideStatus } from '../types/types';
import User from './User';

@Entity()
class Place extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: "text", enum: ["ACCEPTED", "FINISHED", "ONROUTE", "REQEUSTING", "CANCLED"] })
  status: rideStatus;
  @Column({ type: "text" })
  pickUpAddress: string;
  @Column({ type: "double precision", default: 0 })
  pickUpLat: number;
  @Column({ type: "double precision", default: 0 })
  pickUpLng: number;
  @Column({ type: "text" })
  dropOffAddress: string;
  @Column({ type: "double precision", default: 0 })
  dropOffLat: number;
  @Column({ type: "double precision", default: 0 })
  dropOffLng: number;
  @Column({ type: "double precision", default: 0 })
  price: number;
  @Column({ type: "text" })
  distance: string;
  @Column({ type: "text" })
  duration: string;
  @ManyToOne(type => User, user => user.rideAsPassenger)
  passenger: User
  @ManyToOne(type => User, user => user.rideAsDriver)
  driver: User

  @CreateDateColumn()
  createAt: string;
  @UpdateDateColumn()
  updatedAt: string;
}
export default Place;