import { Schema, model, Types } from "mongoose";

export interface ISubject {
    name: string;
    teacher: string;
    alumni: Types.ObjectId[];
}

const SubjectSchema = new Schema<ISubject>({
    name: { type: String, required: true },
    teacher: { type: String, required: true },
    alumni: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

export const SubjectModel = model("Subject", SubjectSchema);