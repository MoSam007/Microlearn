import mongoose, { Document, Schema } from 'mongoose';

export interface IStudent extends Document {
    name: string;
    email: string;
    enrolledCourses: mongoose.Schema.Types.ObjectId[];
}

const studentSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    enrolledCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
}, { timestamps: true });

export default mongoose.model<IStudent>('Student', studentSchema);
