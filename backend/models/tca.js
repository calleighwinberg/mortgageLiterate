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
                    prepaids: { type: Number, default: 0 },
                    contributions: { type: Number, default: 0 }
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
            { name: "", price: 0, downPayment: 0, rate: 0, term: 0, cc: { aprCosts: 0, points: 0, escrowFees: 0, noAPRcosts: 0, contribution: 0 }, mc: { hoa: 0, hazIns: 0, taxes: 0, pmi: 0 } },
            { name: "", price: 0, downPayment: 0, rate: 0, term: 0, cc: { aprCosts: 0, points: 0, escrowFees: 0, noAPRcosts: 0, contribution: 0 }, mc: { hoa: 0, hazIns: 0, taxes: 0, pmi: 0 } },
            { name: "", price: 0, downPayment: 0, rate: 0, term: 0, cc: { aprCosts: 0, points: 0, escrowFees: 0, noAPRcosts: 0, contribution: 0 }, mc: { hoa: 0, hazIns: 0, taxes: 0, pmi: 0 } }
        ]
    }
});

export default mongoose.model("TCA", TCASchema);
