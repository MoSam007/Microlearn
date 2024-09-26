import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
    title: string;
    description: string;
    instructor: mongoose.Schema.Types.ObjectId[];
}

const courseSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true, unique: true },
    instructor: { type: String, required: true},
}, { timestamps: true });

export default mongoose.model<ICourse>('Course', courseSchema);
