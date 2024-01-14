import mongoose, { ObjectId } from "mongoose";

export interface Users {
    _id: ObjectId;
    name: string;
    email: string;
    password: string;
    image: string;
    issues: [mongoose.Types.ObjectId];
    save: () => void;
}

/* UserSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema<Users>(
    {
        name: {
            type: String,
            required: [true, "Please provide a title for this User."],
            minlength: [1, "Name cannot be less than 1 characters"],
            maxlength: [255, "Name cannot be more than 255 characters"],
        },
        email: {
            type: String,
            required: [true, "Please provide email for this User."],
            unique: true,
            minlength: [5, "email cannot be less than 5 characters"],
        },
        password: {
            type: String,
            minlength: [5, "password cannot be less than 5 characters"],
        },
        image: {
            type: String,
        },
        issues: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Issue",
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model<Users>("User", UserSchema);
