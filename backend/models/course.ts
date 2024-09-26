import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
    _id: mongoose.Types.ObjectId;
    title: string;
    description: string;
    duration: string;
    instructor: string;
}

const courseSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    instructor: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<ICourse>('Course', courseSchema);
