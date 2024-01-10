import mongoose, { ObjectId } from "mongoose";

export interface Issues {
    _id: ObjectId;
    title: string;
    description: string;
    status: "OPEN" | "CLOSED" | "IN_PROGRESS";
    save: () => void;
}

/* IssueSchema will correspond to a collection in your MongoDB database. */
const IssueSchema = new mongoose.Schema<Issues>(
    {
        title: {
            type: String,
            required: [true, "Please provide a title for this Issue."],
            unique: true,
            minlength: [1, "Name cannot be less than 1 characters"],
            maxlength: [255, "Name cannot be more than 255 characters"],
        },
        description: {
            type: String,
            required: [true, "Please provide description for this Issue."],
            minlength: [1, "Name cannot be less than 1 characters"],
        },
        status: {
            type: String,
            enum: ["OPEN", "CLOSED", "IN_PROGRESS"],
            default: "OPEN",
        },
    },
    { timestamps: true }
);

export default mongoose.models.Issue || mongoose.model<Issues>("Issue", IssueSchema);
