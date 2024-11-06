import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TCASchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    firstName: String,
    lastName: String,
    address: String,
    lastModified: { type: String, default: "00/00/00" },
    description: { type: String, default: "Below is your personal Total Cost Analysis for your home loan. Thank you for partnering with our team." },
    notes: { type: String, default: "Enter your client notes here:" },
    scenarios: {
        type: [
            {
                name: { type: String, default: "" },
                price: { type: Number, default: 0 },
                downPayment: { type: Number, default: 0 },
                rate: { type: Number, default: 0 },
                term: { type: Number, default: 0 },
                cc: {
                    aprCosts: { type: Number, default: 0 },
                    points: { type: Number, default: 0 },
                    escrowFees: { type: Number, default: 0 },
                    noAPRcosts: { type: Number, default: 0 },
                    contribution: { type: Number, default: 0 }
                },
                mc: {
                    hoa: { type: Number, default: 0 },
                    hazIns: { type: Number, default: 0 },
                    taxes: { type: Number, default: 0 },
                    pmi: { type: Number, default: 0 }
                }
            }
        ],
        default: [
            {}, // First scenario
            {}, // Second scenario
            {}  // Third scenario
        ]
    }
});

export default mongoose.model("TCA", TCASchema);
