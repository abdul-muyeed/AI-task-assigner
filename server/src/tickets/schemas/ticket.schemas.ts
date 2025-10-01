import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Task_Status, Ticket_Priority } from "src/utils/types";


export type TicketDoc = HydratedDocument<Ticket>
@Schema({
    timestamps: true,
})
export class Ticket {
    _id?: Types.ObjectId;
    @Prop({
        type:String
    })
    title:string
    @Prop({
        type:String
    })
    description:string
    @Prop({
        type:String,
        enum: Object.values(Task_Status)
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
    assignedTo?: Types.ObjectId
    @Prop({
        type: String,
        enum: Object.values(Ticket_Priority),
        required: false,
    })
    priority?: Ticket_Priority
    @Prop({
        type: Date,
        required: false,
    })
    deadline?: Date
    @Prop({
        type: String,
        required: false,
    })
    helpfulNotes?: string
    @Prop({
        type: [String],
        required: false,
    })
    relatedSkills?: string[]

}

export const TicketSchema  = SchemaFactory.createForClass(Ticket)