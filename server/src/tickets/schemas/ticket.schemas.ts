import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "src/users/schemas/user.schemas";
import { Task_Status } from "src/utils/types";

export type TicketDoc = HydratedDocument<Ticket>
@Schema({
    timestamps: true,
})
export class Ticket {
    @Prop({
        type:String
    })
    ticket:string
    @Prop({
        type:String
    })
    description:string
    @Prop({
        type:String,
        enum: Object.values(Task_Status),
        default: Task_Status.PENDING
    })
    status: Task_Status
    @Prop({
        type: Types.ObjectId,
        ref: 'Users',
    })
    createdBy: Types.ObjectId
     @Prop({
        type: Types.ObjectId,
        ref: 'Users',
        required: false
    })
    assignedTo?:User
    @Prop()
    priority: string
    @Prop()
    deadline: Date
    @Prop()
    helpfulNotes:string
    @Prop()
    relatedSkills:string[]

}

export const TicketSchema  = SchemaFactory.createForClass(Ticket)