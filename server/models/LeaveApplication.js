import mongoose from "mongoose";

const leaveApplicationSchema = new mongoose.Schema({
    employeeId: { typr: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    type: { type: String, enum: ["SICK", "CASUAL", "ANNUAL"], required: true },
    startDate: {type: Date,default: null},
    endDate: { type: Date, default: null },
    reason: { type: String, required: true },
    status: { type: String, enum: ["PENDING", "APPROVED", "REJECTED"], default: "PENDING" },
}, { timestamps: true });

const LeaveApplication = mongoose.model.LeaveApplication || mongoose.model("LeaveApplication", leaveApplicationSchema);

export default LeaveApplication;