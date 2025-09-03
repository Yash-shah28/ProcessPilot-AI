import mongoose from 'mongoose';

const calendarEventParamsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    recurrence: { type: String }, // e.g., "Every Monday" or null
    date: { type: String },       // Optional if once
    time: { type: String, required: true }, // "HH:mm"
    attendees: [{ type: String, required: true }],
}, { _id: false });

const reminderParamsSchema = new mongoose.Schema({
    offset_minutes: { type: Number, required: true },
    channel: { type: String, enum: ["email", "slack"], required: true }
}, { _id: false });

const emailParamsSchema = new mongoose.Schema({
    to: [{ type: String, required: true }],
    subject: { type: String, required: true },
    content_type: { type: String, required: true } // e.g., "auto_generate_from_notes"
}, { _id: false });



const stepSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    type: {
        type: String,
        enum: ['calendar_event', 'reminder', 'send_email']
    },
    parameters: {
        type: mongoose.Schema.Types.Mixed, // holds any of the above schemas dynamically
    }
})


const workflowSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String },
    description: { type: String, required: true },
    steps: [stepSchema],
    status: {
        type: String,
        enum: ["idle", "running", "completed", "failed"],
        default: "idle"
    },
    executionCount: { type: Number, default: 1 },
    successRate: { type: Number, default: 0 },
    lastRun: { type: Date }
}, { timestamps: true });


export const Workflow = mongoose.model("Workflow", workflowSchema);